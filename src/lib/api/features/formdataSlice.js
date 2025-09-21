import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
};

const formdataSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    addForm: (state, action) => {
      state.forms.push(action.payload);
    },
  },
});


export const { setForms, addForm } = formdataSlice.actions;
export default formdataSlice.reducer;
