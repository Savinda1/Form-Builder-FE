
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSubmitFormMutation, useGetSubmiFormQuery } from "@/lib/api/api";
import FormField from "@/components/Formfield";

export default function FormPreview({ form }) {
  if (!form) return <p>No form selected</p>;

  // Fetch submissions from backend
  const { data, error } = useGetSubmiFormQuery();
  const submissionsArray = data?.submissions || [];

  // ---- Find all submissions for this form ----
  const formSubmissions = submissionsArray.filter(
    (sub) => sub.formId === form._id
  );

  // Last saved customValue OR 0
  const lastSubmission =
    formSubmissions.length > 0
      ? formSubmissions[formSubmissions.length - 1].data?.Submission || 0
      : 0;

  // Local state for customValue
  const [Submission, setCustomValue] = useState(lastSubmission);

  // ---- Validation schema ----
  const schema = z.object(
    form.fields.reduce((acc, field) => {
      if (field.type === "Checkbox")
        acc[field._id] = z.boolean().optional();
      else
        acc[field._id] = field.required
          ? z.string().min(1, `${field.label} is required`)
          : z.string().optional();
      return acc;
    }, {})
  );

  // ---- Default values for form ----
  const defaultValues = form.fields.reduce((acc, f) => {
    acc[f._id] = f.type === "Checkbox" ? false : "";
    return acc;
  }, {});

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // ---- Submit handler ----
  const onSubmit = async (data) => {
    const newValue = Submission+ 1; // increment previous value

   const mappedData = form.fields.reduce((acc, field) => {
    const value = data[field._id];
    acc[field.name || field.label] = value; // use name if exists, otherwise label
    return acc;
  }, {});

    const payload = {
      formId: form._id,
      data: {
          ...mappedData,
        Submission: newValue,
       
      },
    };

    try {
      await submitForm(payload).unwrap();
      setCustomValue(newValue); // update UI
      toast.success("Form submitted successfully!");
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-dotted border-2 border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center">{form.Title}</h2>

      { /*Show customValue count */}
      <p className="text-center text-gray-600 mb-4">
        This form has been submitted{" "}
        <span className="font-semibold">{Submission}</span> times.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {form.fields.map((field) => (
          <FormField key={field._id} field={field} control={control} />
        ))}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}