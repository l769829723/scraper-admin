export default {
  SET_API_HOST: {
    type: "SET_API_HOST",
    reducer: (state, payload) => ({ ...state, api: payload })
  }
};
