import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: "" };
const userSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    updatUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { updatUser } = userSlice.actions;
export default userSlice.reducer;
