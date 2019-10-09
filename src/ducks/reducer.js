//initial state

const initialState = {
  userId: null,
  username: ""
};

//action constants

const SET_USER = "SET_USER";

//action builder

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

//reducer

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};
