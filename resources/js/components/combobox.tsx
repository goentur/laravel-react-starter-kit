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
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { formLabel, truncateText } from './utils'
import InputError from './input-error'

type props = {
    label: string
    selectedValue: string
    options: { value: string; label: string, active?:boolean }[]
    onSelect: (value: string) => void
    error?: string
	autoOpen?: boolean;
	[key: string]: any;
}

export default function Combobox({
    label,
    selectedValue,
    options,
    onSelect,
    error,
    autoOpen,
    ...propss
}: props) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (autoOpen) {
            setOpen(true);
        }
    }, [autoOpen]);
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
                        {selectedValue
                            ? options.find((d) => d.value === selectedValue)?.label
                            : `Pilih ${formLabel(label)}`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                    <Command>
                        <CommandInput
                            placeholder={`Cari ${formLabel(label)}`}
                        />
                        <CommandList>
                            <CommandEmpty>{formLabel(label)} tidak ada.</CommandEmpty>
                            <CommandGroup>
                                {options.map((d) => (
                                    <CommandItem
                                        key={d.value}
                                        value={d.label}
							            disabled={d.active}
                                        onSelect={() => {
                                            onSelect(d.value)
                                            setOpen(false)
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
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <InputError message={error} />
        </div>
    )
}