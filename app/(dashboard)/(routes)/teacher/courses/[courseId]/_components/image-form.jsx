"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FileUploader from '@/components/file-uploader'

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required!"
    })
})
const ImageForm = ({ courseId, initialData }) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
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
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className='size-4 mr-2' />Add an image
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <><Pencil className='h-4 w-4 mr-2' />Edit image</>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                        <ImageIcon className='h-10 w-10 text-slate-500' />
                    </div>
                ) : (
                    <div className='relative aspect-video mt-2'>
                        <Image
                            alt='upload'
                            fill
                            className='object-cover rounded-md'
                            src={initialData.imageUrl}

                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUploader
                        endPoint={'courseImage'}
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                        16:9 aspect ratio recommended!
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageForm