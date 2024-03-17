import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const storedState = localStorage.getItem('Mini-chat v1.0.0');
  return storedState ? JSON.parse(storedState) : { username: null, token: null };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      const userDataString = JSON.stringify(action.payload);
      localStorage.setItem('Mini-chat v1.0.0', userDataString);
      return {
        ...state,
        username,
        token,
      };
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentUser = (state) => state.auth.username;
export const getCurrentToken = (state) => state.auth.token;
