//initial state

const initialState = {
  userId: null,
  username: "",
  dogImgs: []
};

//action constants

const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const DOGS_RATED = "DOGS_RATED";

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

export function dogsRated(dogs) {
  return {
    type: DOGS_RATED,
    payload: dogs
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
    case DOGS_RATED:
      return { ...state, dogImgs: payload };
    default:
      return state;
  }
};
