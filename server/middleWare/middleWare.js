const checkSession = (req, res, next) => {
  console.log('----->> Зашли в checkSession, проверка наличия сессии.');
  console.log('Если юзер не залогинен - req.session.user будет undefined');
  console.log('<<----- получен req.session.user и записан в res.locals.user  -> ', req.session.user);
  if (req.session.user && req.session.user.id) {
    res.locals.user = {
      name: req.session.user.name,
      id: req.session.user.id,
      role: req.session.user.role,
    };

    return next(); // return next() - прерываем выполнение checkSession
  }
  next();
};

module.exports = { checkSession };
