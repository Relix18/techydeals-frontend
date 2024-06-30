import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    // Simplify the payload structure by directly expecting the user object as the payload
    loggedIn(state, action) {
      state.user = action.payload;
    },
  },
});

export const { loggedIn } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
