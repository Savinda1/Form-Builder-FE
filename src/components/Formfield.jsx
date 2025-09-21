import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function FormField({ field, control }) {
  const { _id, label, required, type, options } = field;

  const rules = { required: required ? `${label} is required` : true };

  return (
    <Controller
      name={_id}
      control={control}
      rules={rules}
      render={({ field: f, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label>
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>

          {type === "Text Input" && <Input {...f} placeholder={label}  required/>}
          {type === "Text Area" && <Textarea {...f} placeholder={label}  required />}
          {type === "Checkbox" && (
            <div className="flex items-center gap-2">
              <Checkbox id={_id} checked={!!f.value} onCheckedChange={f.onChange} />
              <Label htmlFor={_id}>{label}</Label>
            </div>
          )}
          {type === "Option" && (
            <Select value={f.value} onValueChange={f.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt, i) => (
                  <SelectItem key={i} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {fieldState.error && (
            <span className="text-red-500 text-sm">{fieldState.error.message}</span>
          )}
          
        </div>
      )}
    />
  );
}
