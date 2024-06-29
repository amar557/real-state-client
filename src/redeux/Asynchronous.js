import { link } from "../firebase/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getAllItems =

export const getAllItems = createAsyncThunk("list", async function (id) {
  const res = await fetch(`${link}/api/useritems/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
});
