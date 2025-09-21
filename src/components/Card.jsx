import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { EditIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useGetSubmiFormQuery } from "@/lib/api/api";



import { useSelector } from "react-redux";

export default function NewsCard({ form }) {

const { data, error, isLoading } = useGetSubmiFormQuery();
console.log("All submissions response:", data);

const submissionsArray = data?.submissions || [];

// filter this form's submissions
const formSubmissions = submissionsArray.filter(
  (sub) => sub.formId === form._id
);

// get the last customValue (single value, not array)
const csval = formSubmissions.length > 0 
  ? formSubmissions[formSubmissions.length - 1].data?.Submission
  : 0;

console.log("csval (latest customValue):", csval);




    
  //const [customValue, setCustomValue] = useState(0);
  //const navigate = useNavigate();
 //onst forms = useSelector((state) => state.formdata.forms);
  //console.log("forms in card:",forms);
  // Edit button handler
/*  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };*/

  // Preview button handler
  const handlePreview = (id) => {
    console.log("Preview clicked", id);
    setCustomValue((prev) => prev + 1);
  };

  // Custom action handler
  const handleCustomAction = (id) => {
    console.log("Custom action clicked", id);
  };



  return (
    <div className="p-12 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border">
      {/* Form Title */}
      <h3 className="font-semibold text-lg sm:text-xl">{form.Title}</h3>


      {/* Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap- mt-8">
        <Button
          className="bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto flex items-center gap-2"
          onClick={() => handleEdit(form._id)}
        >
          <EditIcon size={16} /> Edit
        </Button>

<Link to={`/preview/${form._id}`} 
 key={form._id}   className="w-full sm:w-auto" >
     <Button
          className="bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => handlePreview(form._id)}
        >
          Preview
        </Button>
</Link>

        <Button
          className="bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => handleCustomAction(form._id)}
        >
{csval}
        </Button>

        <Button
          className="bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto flex items-center justify-center"
          onClick={() => handleDelete(form._id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>

     
{/*{form.fields && form.fields.length > 0 && (
        <div className="mt-4 space-y-2">
          {form.fields.map((field, index) => (
            <p key={index} className="text-gray-700">
              {field.label || field.Title || `Field ${index + 1}`}
            </p>
          ))}
        </div>
      )}*/}
    </div>
  );
}
