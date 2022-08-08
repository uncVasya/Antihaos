/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
// ws
const http = require('http');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const { checkSession, checkLogin } = require('./middleWare/middleWare');
const { Queue, User } = require('./db/models');
const indexRouter = require('./routers/indexRouter');
const checkRouter = require('./routers/checkRouter');

const usersRouter = require('./routes/users');
const queueRouter = require('./routes/queue');
const tournamentsRouter = require('./routes/tournaments');
const adminRouter = require('./routes/adminRouter');
const getQueue = require('./wsFunction/getQueue');
const addToQueue = require('./wsFunction/addToQueue');
const {
  EXIT_FROM_QUEUE, ADD_TO_QUEUE, START, MOVE_DOWN_QUEUE, WIN, CHANGE_MODE, DUO_ADD_TO_QUEUE, DUO_EXIT_FROM_QUEUE, DUO_JOIN_PAIR_QUEUE, DUO_MOVE_DOWN_QUEUE, DUO_WIN_QUEUE,
} = require('./Types/type_server');
const exitFromQueue = require('./wsFunction/exitFromQueue');
const moveDownQueue = require('./wsFunction/moveDownQueue');
const win = require('./wsFunction/win');
const changeMode = require('./wsFunction/changeMode');
const getQueueAndMode = require('./wsFunction/getQueue');
const duoAddToQueue = require('./wsFunction/duoAddToQueue');
const duoExitFromQueue = require('./wsFunction/duoExitFromQueue');
const duoJoinPairQueue = require('./wsFunction/duoJoinPairQueue');
const duoMoveDownQueue = require('./wsFunction/duoMoveDownQueue');
const duoWinQueue = require('./wsFunction/duoWinQueue');

const sessionParser = session({
  store: new FileStore({}),
  name: 'sID',
  secret: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: false,
  },
});
const app = express();
// const map = new Map();
const { PORT } = process.env;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors({ credentials: true, origin: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionParser);
app.use(checkSession);
app.use('/', indexRouter);
app.use('/check', checkRouter);
app.use('/users', usersRouter);
app.use('/queue', queueRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

app.use((err, req, res, next) => {
  const appMode = req.app.get('env');
  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.sendStatus(err.status || 500);
  res.render('error');
});
const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });
let mapQueue = [];

server.on('upgrade', (req, socket, head) => {
  console.log('Зпауск WS...');

  sessionParser(req, {}, () => {
    if (!req.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      console.log('Сокет убит!');
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
});

wss.on('connection', (ws, req) => {
  const id = req.session.user?.id || uuidv4();

  ws.userId = id;

  const findeUserId = mapQueue.map((el) => el.userId);
  console.log('------>', findeUserId);
  if (true) mapQueue.push(ws);
  console.log('Колличество залогиненных пользователей = ', mapQueue.length);

  ws.on('message', async (message) => {
    const { type, params } = JSON.parse(message);
    switch (type) {
      case START:
        await getQueueAndMode(mapQueue);
        break;
      case ADD_TO_QUEUE:
        await addToQueue(mapQueue, params);
        break;
      case MOVE_DOWN_QUEUE:
        await moveDownQueue(mapQueue, params);
        break;
      case EXIT_FROM_QUEUE:
        await exitFromQueue(mapQueue, params);
        break;
      case WIN:
        await win(mapQueue, params);
        break;
      case CHANGE_MODE:
        await changeMode(mapQueue, params);
        break;
      case DUO_ADD_TO_QUEUE:
        await duoAddToQueue(mapQueue, params);
        break;
      case DUO_EXIT_FROM_QUEUE:
        await duoExitFromQueue(mapQueue, params);
        break;
      case DUO_JOIN_PAIR_QUEUE:
        await duoJoinPairQueue(mapQueue, params);
        break;
      case DUO_MOVE_DOWN_QUEUE:
        await duoMoveDownQueue(mapQueue, params);
        break;
      case DUO_WIN_QUEUE:
        await duoWinQueue(mapQueue, params);
        break;
      default:
        console.log('error switch onmessage');
        break;
    }
  });

  ws.on('close', () => {
    mapQueue = mapQueue.filter((el) => (el !== ws));
  });
});

server.listen(PORT, () => {
});
