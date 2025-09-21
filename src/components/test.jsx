import { useState } from "react";
import { Button } from "@/components/ui/button";

const test = () => {
  const [fields, setFields] = useState([]);

  // add new field
const addField = (type) => {
  setFields([...fields, { id: Date.now(), type, label: `${type} Field` }]);
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Form</h1>

      {/* Buttons to add fields */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button onClick={() => addField("text")}>+ Text Input</Button>
        <Button onClick={() => addField("textarea")}>+ Text Area</Button>
        <Button onClick={() => addField("radio")}>+ Radio Button</Button>
        <Button onClick={() => addField("checkbox")}>+ Checkbox</Button>
      </div>

      {/* Render added fields */}
      <div className="space-y-4">
        {fields.map((field) => (
          <div
            key={field.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <label className="block text-sm font-medium mb-2">
              {field.label}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter text"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter details"
              />
            )}

            {field.type === "radio" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name={field.id} /> Option 1
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name={field.id} /> Option 2
                </label>
              </div>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Option 1
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Option 2
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default test;
