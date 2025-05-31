import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { alertApp, formLabel, truncateText } from './utils'
import InputError from './input-error'

type OptionType = { value: string; label: string; active?: boolean };
type props = {
    label: string
    selectedValue: string
    fetchOptions: (keyword: string) => Promise<OptionType[]>;
    onSelect: (value: string, label: string) => void
    search: string
    setSearch: (value: string) => void
    error?: string
	[key: string]: any;
}

export default function ComboboxDinamis({ label,selectedValue,fetchOptions,onSelect,search,setSearch,error }: props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedValue && search === '') {
            fetchOptions('').then((data) => {
                setOptions(data)
            })
        }
    }, [selectedValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (open && search.length >= 3) {
                fetchData(search);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    const fetchData = async (keyword: string) => {
        setLoading(true);
        try {
            const result = await fetchOptions(keyword);
            setOptions(result);
        } catch (e:any) {
            alertApp(e.message,"error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-2">
            {label && (
                <Label className="capitalize">
                    {formLabel(label)}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {loading && !selectedValue
                            ? `Pilih ${formLabel(label)}`
                            : options.find((d: any) => d.value === selectedValue)?.label || `Pilih ${formLabel(label)}`
                        }
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                    <Command>
                        <CommandInput
                            placeholder="Masukan 3 huruf atau lebih"
                            onValueChange={(val) => setSearch(val)}
                            value={search}
                        />
                        <CommandList>
                        {loading ? (
                            <div className="p-2 text-sm text-muted-foreground flex"><Loader2 className="animate-spin me-1" size="20" /> Memuat data...</div>
                        ) : (
                            <>
                                {options.length === 0 && (
                                    <CommandEmpty>{formLabel(label)} tidak ditemukan.</CommandEmpty>
                                )}
                                <CommandGroup>
                                    {options.map((d:any) => (
                                        <CommandItem
                                            key={d.value}
                                            value={d.label}
                                            onSelect={() => {
                                                onSelect(d.value, search);
                                                setOpen(false);
                                            }}
                                        >
                                            {truncateText(d.label, false)}
                                            <Check
                                                className={cn(
                                                    'ml-auto',
                                                    selectedValue === d.value ? 'opacity-100' : 'opacity-0'
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <InputError message={error} />
        </div>
    )
}