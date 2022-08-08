import axios from 'axios';
import { SET_USER } from '../types';

export const setUser = (value) => ({
  type: SET_USER,
  payload: value,
});

export const regUser = (value) => (dispatch) => {
  axios.post('/check/signup', value)
    .then((response) => dispatch(setUser(response.data)))
    .catch((err) => console.log(err));
};

export const checkUser = () => (dispatch) => {
  axios.post('/check/check')
    .then((response) => dispatch(setUser(response.data)))
    .catch((err) => dispatch(setUser({})));
};

export const userLogOut = () => (dispatch) => {
  axios('/check/signout')
    .then((res) => dispatch(setUser({})));
};

export const userSignIn = (value) => (dispatch) => {
  axios.post('/check/signin', value)
    .then((res) => dispatch(setUser(res.data)));
};
