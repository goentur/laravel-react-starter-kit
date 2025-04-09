import FormInput from '@/components/form-input'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Loader2, Save } from 'lucide-react'
type props = {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    data: any
    isEdit: boolean
    setData: (data: any) => void
    errors: any
    formRefs: React.RefObject<Record<string, HTMLInputElement | null>>
    processing: boolean
    handleForm: (e: React.FormEvent) => void
    dataPermissions: { value: string; label: string }[]
}
export default function FormDialog({
    open,
    setOpen,
    title,
    data,
    isEdit,
    setData,
    errors,
    formRefs,
    processing,
    handleForm,
    dataPermissions,
}: props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='w-5xl'>
                <form onSubmit={handleForm}>
                    <DialogHeader>
                        <DialogTitle>Form {title}</DialogTitle>
                        <DialogDescription className='italic'>"Silakan isi formulir di bawah ini dengan lengkap dan benar"</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 mt-5">
                        <FormInput
                            id="nama"
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData((prevData: any) => ({ ...prevData, nama: e.target.value }))}
                            inputRef={(el) => {
                                if (formRefs.current) {
                                    formRefs.current['nama'] = el;
                                }
                            }}
                            placeholder="Masukkan nama permission"
                            error={errors.name}
                            readOnly={isEdit}
                            autoFocus
                            required
                        />
                        <div className="grid gap-2">
                            <Label htmlFor="permissions" className="capitalize mb-2">
                                permissions
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                {dataPermissions?.map((p: any) => (
                                    <div className="grid gap-2" key={p.value}>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={p.value}
                                                value={p.value}
                                                checked={data.permissions?.includes(
                                                    p.value
                                                )}
                                                onCheckedChange={() =>setData((prevData: any) => ({ ...prevData, permissions: prevData.permissions.includes(p.value) ? prevData.permissions.filter((item: string) => item !== p.value) : [...prevData.permissions, p.value]}))}
                                            />
                                            <label
                                                htmlFor={p.value}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {p.label}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.permissions} />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center mt-5">
                            <Button type="submit" disabled={processing}> {processing ? (<Loader2 className="animate-spin" />) : (<Save /> )} Simpan</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
