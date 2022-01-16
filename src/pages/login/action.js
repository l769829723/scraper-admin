export default {
  LOGIN_USER: {
    type: "LOGIN_USER",
    reducer: (state, payload) => ({ ...state, credential: payload }),
  },
};
