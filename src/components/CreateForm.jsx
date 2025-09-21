import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner"; // Added sonner for toasts
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useCreateFormMutation } from "@/lib/api/api";

const formSchema = z.object({
  Title: z.string().min(1, { message: "Title is required" }),
});

const createForm = () => {

  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

 

  
  const [createForm, { isLoading }] = useCreateFormMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "", // Prevents undefined
    },
  });

  // Add new field
  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type,
        label: `${type} Field`, // Fixed trailing space
        required: false,
        options: type === "Option" ? ["Option 1", "Option 2"] : [],
      },
    ]);
  };

  // Remove field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Update field label
  const updateFieldLabel = (id, newLabel) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, label: newLabel } : f)));
  };

  // Toggle required field
  const toggleRequired = (id) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, required: !f.required } : f)));
  };

  // Add option to Option field
  const addOption = (id) => {
    setFields(
      fields.map((f) =>
        f.id === id
          ? { ...f, options: [...(f.options || []), `Option ${(f.options?.length || 0) + 1}`] }
          : f
      )
    );
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      toast.loading("Saving form...");
      const formData = {
        Title: values.Title,
        fields: fields.map(({ id, ...rest }) => rest),
      };
      console.log("Form data:", formData); // Debug
     // const response = await createForm(formData).unwrap();
      createForm(formData);
      toast.success("Form saved successfully!");
      //navigate(`/forms/${response.id}`);
      //console.log("Form created with ID:", response);
     
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error(`Form creation failed: ${error.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border-dotted border-2 border-gray-300 rounded-lg bg-white">
      
      <div className="flex gap-3 mb-4 items-center">
        <h1 className="text-2xl font-bold flex-1">Create Form</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Cancel
        </Link>
        <Button
          className="bg-blue-700"
          type="button"
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isLoading}
        >
          <PlusSquare size={20} className="mr-2" />
          Save Form
        </Button>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Title*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter form title"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="grid grid-cols-2 gap-3 mb-6 mt-6">
        <Button onClick={() => addField("Text Input")}>+ Text Input</Button>
        <Button onClick={() => addField("Text Area")}>+ Text Area</Button>
        <Button onClick={() => addField("Option")}>+ Radio Button</Button>
        <Button onClick={() => addField("Checkbox")}>+ Checkbox</Button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <Input
                value={field.label}
                onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                className="mb-2"
                placeholder="Enter field label"
              />
              {field.type === "Text Input" && (
                <div>
                  <Input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Text Field"
                    disabled
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={() => toggleRequired(field.id)}
                      />
                      Required field
                    </label>
                  </div>
                </div>
              )}
              {field.type === "Text Area" && (
                <div>
                  <Textarea
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Textarea Field"
                    disabled
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={() => toggleRequired(field.id)}
                      />
                      Required field
                    </label>
                  </div>
                </div>
              )}
              {field.type === "Checkbox" && (
                <div>
                  <Input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Checkbox Field"
                    disabled
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={() => toggleRequired(field.id)}
                      />
                      Required field
                    </label>
                  </div>
                </div>
              )}
              {field.type === "Option" && (
                <div className="space-y-2">
                  
                {(field.options || []).map((opt, idx) => (
  <label key={idx} className="flex items-center gap-2">
    <Checkbox disabled />
    <Input
      value={opt} 
      onChange={(e) => {
        const newOptions = [...field.options]; 
        newOptions[idx] = e.target.value;
        setFields((prev) =>
          prev.map((f) =>
            f.id === field.id ? { ...f, options: newOptions } : f
          )
        );
      }}
      placeholder={`Option ${idx + 1}`}
    />
  </label>
))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addOption(field.id)}
                  >
                    + Add Option
                  </Button>
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={() => toggleRequired(field.id)}
                      />
                      Required field
                    </label>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeField(field.id)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default createForm;