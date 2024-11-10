"use client"
import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import toast from 'react-hot-toast'
const FileUploader = ({ onChange, endPoint }) => {
    return (
        <UploadDropzone endpoint={endPoint} onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }}
            onUploadError={(error) => {
                toast.error(`${error?.message}`)
            }}
        />
    )
}

export default FileUploader