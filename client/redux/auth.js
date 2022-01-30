
const SET_AUTH = 'SET_AUTH';

export const setAuthorization = (auth) => {
    return {
        type:SET_AUTH,
        auth
    }
}

export default function (state = {}, action) {
    switch (action.type) {
      case SET_AUTH:
        return action.auth;
      default:
        return state;
    }
  }

