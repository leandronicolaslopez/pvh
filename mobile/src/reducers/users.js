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
      return { ...state, saveLoading: true, saveError: '',  };
    case types.SAVE_USER_SUCCESS:
      return { ...state, saveLoading: false, saveError: '', saveSuccess: true };
    case types.SAVE_USER_ERROR:
      return { ...state, saveLoading: false, saveError: action.message, };
    default:
      return state;
  }
}