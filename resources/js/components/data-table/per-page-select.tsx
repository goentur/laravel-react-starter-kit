import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type props = {
    onChange: (value: number) => void;
};

export default function PerPageSelect({ onChange }:props) {
    return (
        <Select defaultValue="25" onValueChange={(value) => onChange(Number(value))}>
            <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Pilih per halaman"/>
            </SelectTrigger>
            <SelectContent align="start">
                {[25, 50, 75, 100].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};