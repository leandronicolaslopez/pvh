import { GET_USERS, GET_USERS_ERROR, LOADING_USERS, SAVE_USER_LOADING, SAVE_USER_SUCCESS, SAVE_USER_ERROR, DELETE_USER_LOADING, DELETE_USER_SUCCESS, DELETE_USER_ERROR } from './types';
import userApi from './../api/userApi';

export default {
  getAll: () => (
    dispatch => (
      new Promise((resolve, reject) => {
        dispatch({ type: LOADING_USERS });
        getAllUsers(dispatch, resolve);
      })
    )
  ),
  signUpUser: (user) => (
    dispatch => (
      new Promise((resolve, reject) => {
        dispatch({ type: SAVE_USER_LOADING });
        userApi.create(user)
          .then(() => {
            dispatch({ type: SAVE_USER_SUCCESS });
            getAllUsers(dispatch, resolve);
          })
          .catch((error) => {
            dispatch({ type: SAVE_USER_ERROR, message: error.message });
            reject();
          });
      })
    )
  ),
  editUser: (user) => (
    dispatch => (
      new Promise((resolve, reject) => {
        dispatch({ type: SAVE_USER_LOADING });
        userApi.update(user)
          .then(() => {
            dispatch({ type: SAVE_USER_SUCCESS });
            getAllUsers(dispatch, resolve);
          })
          .catch((error) => {
            dispatch({ type: SAVE_USER_ERROR, message: error.message });
            reject();
          });
      })
    )
  ),
  deleteUser: (user) => (
    dispatch => (
      new Promise((resolve, reject) => {
        //dispatch({ type: DELETE_USER_LOADING });
        userApi.delete(user.id)
          .then(() => {
            getAllUsers(dispatch, resolve);
          })
          .catch((error) => {
            getAllUsers(dispatch, resolve);
            resolve();
          });
      })
    )
  )
}

getAllUsers = (dispatch, resolve) => {
  userApi.getAll()
    .then((users) => {
      dispatch({ type: GET_USERS, users });
      resolve();
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_ERROR, message: error.message });
      resolve();
    });
}