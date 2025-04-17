import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  token: null,
};

const AuthToken = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = AuthToken.actions;
export default AuthToken.reducer;
