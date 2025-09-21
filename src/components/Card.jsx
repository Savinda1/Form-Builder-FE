import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetSubmiFormQuery } from "@/lib/api/api";

export default function NewsCard({ form }) {
  const { data } = useGetSubmiFormQuery();
  console.log("All submissions response:", data);

  const submissionsArray = data?.submissions || [];

  // filter this form's submissions
  const formSubmissions = submissionsArray.filter(
    (sub) => sub.formId === form._id
  );

  // get the last customValue
  const csval =
    formSubmissions.length > 0
      ? formSubmissions[formSubmissions.length - 1].data?.Submission
      : 0;

  // Handlers
  const handlePreview = (id) => {
    console.log("Preview clicked", id);
  };

  const handleCustomAction = (id) => {
    console.log("Custom action clicked", id);
  };

  const handleEdit = (id) => {
    console.log("Edit clicked", id);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked", id);
  };

  return (
    <Card className="w-full max-w-md mx-auto border shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold">
          {form.Title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-500">
          {form.fields?.length || 0} Fields
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button
          variant="default"
          className="bg-blue-700 text-white flex items-center gap-2 w-full sm:w-auto"
          onClick={() => handleEdit(form._id)}
        >
          <EditIcon size={16} /> Edit
        </Button>

        <Link to={`/preview/${form._id}`} className="w-full sm:w-auto">
          <Button
            className="bg-blue-700 text-white w-full sm:w-auto"
            onClick={() => handlePreview(form._id)}
          >
            Preview
          </Button>
        </Link>

        <Button
          className="bg-blue-700 text-white w-full sm:w-auto"
          onClick={() => handleCustomAction(form._id)}
        >
          {csval}
        </Button>

        <Button
          variant="destructive"
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={() => handleDelete(form._id)}
        >
          <Trash2 size={16} /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
