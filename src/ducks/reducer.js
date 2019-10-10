//initial state

const initialState = {
  userId: null,
  username: ""
};

//action constants

const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";

//action builder

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

//reducer

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      return initialState;
    case SET_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};
