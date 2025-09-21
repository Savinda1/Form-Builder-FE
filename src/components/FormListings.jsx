import React from "react";
import Card from "./Card";
import { useEffect } from "react";
import { useGetFormQuery } from "@/lib/api/api";
import { setForms } from "@/lib/api/features/formdataSlice";
import { useParams } from "react-router-dom"; // <-- useParams import
import { useDispatch, useSelector } from "react-redux";

export default function FormListings() {
 const dispatch = useDispatch();
  const { data, error, isLoading } = useGetFormQuery();
// console.log("data:",data);
//const forms = useSelector((state) => state.formdata.forms);
//console.log("forms from redux:", forms);


    



   useEffect(() => {
    if (data) {
      dispatch(setForms(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching form:", error);
    return <p>Error loading form</p>;
  }
//const form= data? data.map((forms)=>forms.forms) :[];

//console.log("fdjhjdf",form)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((form) => (
        <Card key={form._id} form={form} />
      ))}

   

    </div>
  );
}
