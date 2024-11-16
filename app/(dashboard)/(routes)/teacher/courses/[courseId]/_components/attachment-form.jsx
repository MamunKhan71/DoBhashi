"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
    Form,
    FormControl,
    FormMessage,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { File, Loader2, PlusCircle, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    url: z.string().min(1, "Attachment is required"),
});

const AttachmentForm = ({ courseId, initialData }) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: initialData?.url || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;
    const toggleEdit = () => setIsEditing(current => !current)

    const onSubmit = async (values) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values)
            toast.success("Course Updated!")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const onDelete = async (id) => {
        try {
            setDeletingId(id)
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("Attachment Deleted")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setDeletingId(null)
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course attachments
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <><File className='h-4 w-4 mr-2' />Add a file</>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {/* Check if attachments array exists and has items */}
                    {initialData?.attachments?.length > 0 ? (
                        <div className='space-y-2 mt-2'>
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className='flex items-center justify-between bg-sky-100 border-e-sky-100 border rounded-md p-3 w-full'
                                >
                                    <File className='h-4 w-4 mr-2 flex-shrink-0' />
                                    <p className='w-1/2 overflow-hidden line-clamp-1'>{attachment.name}</p>
                                    {
                                        deletingId === attachment.id && (
                                            <div className='h-4 w-4 animate-spin'>
                                                <Loader2 />
                                            </div>
                                        )
                                    }
                                    {
                                        deletingId !== attachment.id && (
                                            <div className='h-4 w-4 '>
                                                <button
                                                    onClick={()=> onDelete(attachment.id)}
                                                    className='ml-auto hover:opacity-75 transition w-full'
                                                >
                                                    <X />
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-sm text-slate-500 italic mt-2'>No attachment</p>
                    )}
                </>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-4'
                    >
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='flex items-center gap-2'>
                                            <Input
                                                type="text"
                                                className="bg-white"
                                                disabled={isSubmitting}
                                                placeholder="e.g Place the course video url..."
                                                {...field}
                                            />
                                            <Button className="w-28">Add<PlusCircle size={20} /></Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            )}
        </div>
    )
}

export default AttachmentForm
