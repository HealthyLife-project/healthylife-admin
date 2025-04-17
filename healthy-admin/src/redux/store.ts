import { configureStore } from "@reduxjs/toolkit";
import AuthTokenReducer from "./authtoken";

//redux store ts
const store = configureStore({
  reducer: {
    token: AuthTokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
