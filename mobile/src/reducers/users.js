import initialState from './initialState'
import * as types from '../actions/types'

export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return { data: action.users, loading: false, error: '' };
    case types.LOADING_USERS:
      return { data: [], loading: true, error: '' };
    case types.GET_USERS_ERROR:
      return { data: [], loading: false, error: action.message };
    case types.SAVE_USER_LOADING:
      return { saveLoading: true, saveError: '', ...state };
    case types.SAVE_USER_SUCCESS:
      return { saveLoading: false, saveError: '', saveSuccess: true, ...state };
    case types.SAVE_USER_ERROR:
      return { saveLoading: false, saveError: action.message, ...state };
    default:
      return state;
  }
}