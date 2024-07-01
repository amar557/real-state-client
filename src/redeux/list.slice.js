import { createSlice } from "@reduxjs/toolkit";
import { getAllItems } from "./Asynchronous";
const lists = createSlice({
  name: "list",
  initialState: { loading: false, items: [], error: "" },
  reducers: {
    deleteUserItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getAllItems.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default lists.reducer;
export const { deleteUserItem } = lists.actions;
