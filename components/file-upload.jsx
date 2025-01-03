
import toast from "react-hot-toast"

import { UploadDropzone } from "@/lib/uploadthing"

export const FileUpload = ({ onChange, endpoint }) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={res => (
                // console.log("upRes: ", res);
                onChange(res?.[0].url)
            )}
            onUploadError={error => {
                toast.error(`${error?.message}`)
            }}
        />
    )
}
