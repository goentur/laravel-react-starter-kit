import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type props = {
    className?: string;
    onChange: (value: number) => void;
};

export default function PerPageSelect({ className = "w-1/3", onChange }:props) {
    return (
        <Select onValueChange={(value) => onChange(Number(value))}>
            <SelectTrigger className={className}>
                <SelectValue placeholder="Pilih per halaman"/>
            </SelectTrigger>
            <SelectContent>
                {[25, 50, 75, 100].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};