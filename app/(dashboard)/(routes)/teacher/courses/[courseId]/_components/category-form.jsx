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
import { Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/ui/combobox'

const formSchema = z.object({
    categoryId: z.string().min(1, {
        message: "Category is required!"
    })
})
const CategoryForm = ({ courseId, initialData, options }) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        }
    })
    const { isSubmitting, isValid } = form.formState;
    const toggleEdit = () => setIsEditing(current => !current)
    const onSubmit = async (values) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course Updated!")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong!")

        }
    }

    const selectedOption = options.find((option) => option.value === initialData.categoryId)
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course category
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    )
                        :
                        <><Pencil className='h-4 w-4 mr-2' />Edit category</>
                    }
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2", !initialData.categoryId && 'text-slate-500 italic')}>{selectedOption?.label || "No Category"}</p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-4'
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Combobox
                                                options={...options}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default CategoryForm