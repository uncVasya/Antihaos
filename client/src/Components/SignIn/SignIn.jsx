import React, { useState } from 'react';
import {
  Button,
  Col, Form, FormGroup, Input, Row,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../../Redux/Actions/signAction';
import './Signin.css';
// import { userSignIn } from '../../Redux/actions/userAction';

export default function SignIn() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  // console.log('inputs-------', inputs);

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignIn(inputs));
    setInputs({});
  };

  const style = {
    input: {
      borderRadius: 0,
      width: '180px',
    },
  };

  const addStyle = {
    input: {
      width: '280px',
    },
  };

  return (
    <div className="content-wrapper">
      <h3 className="text-center">Авторизация</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Input
            name="nickName"
            type="text"
            placeholder="Nick name"
            value={inputs.nickName || ''}
            onChange={inputHandler}
            style={style.input}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="pass"
            placeholder="Пароль"
            value={inputs.pass || ''}
            onChange={inputHandler}
            style={style.input}
          />
        </FormGroup>
        <Button
          style={style.input}
          block
        >
          Войти

        </Button>
      </Form>
      {/* </Col> */}
      {/* </Row> */}
    </div>
  );
}
