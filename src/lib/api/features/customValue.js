// features/customValueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const customValueSlice = createSlice({
  name: "customValue",
  initialState,
  reducers: {
    setCustomValue: (state, action) => {
      state.value = action.payload; // save new value
    },
    increment: (state) => {
      state.value += 1; // increment
    },
  },
});

export const { setCustomValue, increment } = customValueSlice.actions;
export default customValueSlice.reducer;
