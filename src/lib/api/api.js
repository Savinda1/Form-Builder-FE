// src/api/formApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//const BACKEND_URL = "http://localhost:8000";
//const BACKEND_URL = https://form-builder-be-inky.vercel.app/

//VITE_BACKEND_URL=https://aidf-horizone-backend-amila.vercel.app

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }), 
  tagTypes: ["Form"],
  endpoints: (builder) => ({
    createForm: builder.mutation({
      query: (formData) => ({
        url: "/forms",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Form"], // Refresh form list if needed
    }),
    getForm: builder.query({
      query: () => "forms",
      providesTags: ["Form"],
    }),
     submitForm: builder.mutation({
      query: (body) => ({
        url: "/submissions",
        method: "POST",
        body,
      }),
    }),
    
 getSubmiForm: builder.query({
  query: () => "submissions",   
  providesTags: ["Form"],
}),




  }),
});

export const { useCreateFormMutation, useGetFormQuery,useSubmitFormMutation,useGetSubmiFormQuery } = formApi;