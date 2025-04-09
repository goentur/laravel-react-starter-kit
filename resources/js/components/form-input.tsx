import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RefObject } from "react";
import InputError from "./input-error";
import { formLabel } from "./utils";

interface props {
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement> | ((el: HTMLInputElement | null) => void);
    [key: string]: any; // Menangani properti bebas seperti autoFocus, required, autocomplete
}

export default function FormInput({
    id,
    value,
    onChange,
    inputRef,
    placeholder,
    error,
    ...propss
}: props) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="capitalize">
                {formLabel(id)}
            </Label>
            <Input
                id={id}
                className="mt-1 block w-full"
                value={value}
                onChange={onChange}
                ref={inputRef}
                placeholder={placeholder}
                {...propss}
            />
            <InputError message={error} />
        </div>
    );
}
