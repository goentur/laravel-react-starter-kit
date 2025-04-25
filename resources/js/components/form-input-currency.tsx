import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { RefObject } from 'react';
import { NumericFormat } from 'react-number-format';
import { formLabel } from './utils';
import InputError from './input-error';
interface Props {
    id: string;
    value: string | number;
    onChange: (value: string, floatValue?: number) => void;
    error?: string;
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement> | ((el: HTMLInputElement | null) => void);
    [key: string]: any;
}
const FormInputCurrency = ({ 
    id,
    value,
    onChange,
    inputRef,
    placeholder,
    error,
    ...propss
}: Props) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="capitalize">
                {formLabel(id)}
            </Label>
            <NumericFormat
                id={id}
                value={value}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                onValueChange={(values) => onChange(values.value, values.floatValue)}
                customInput={Input}
                placeholder={placeholder}
                getInputRef={inputRef}
                className='text-end'
                {...propss}
            />
            <InputError message={error} />
        </div>
    )
}
export default FormInputCurrency