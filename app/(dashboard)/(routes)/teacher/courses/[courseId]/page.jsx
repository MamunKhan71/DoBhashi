import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { ObjectId } from 'mongodb'
import { IconBadge } from '@/components/icon-badge'
import { LayoutDashboard } from 'lucide-react'
import TitleForm from './_components/title-form'
const CourseDetailsPage = async ({ params }) => {
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }
    if (!ObjectId.isValid(params.courseId)) {
        return redirect('/')
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    const progressText = `(${completedFields}/${totalFields})`

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between '>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-2xl font-medium'>
                        Course Setup
                    </h1>
                    <span>Complete all fields {progressText}</span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>Customize your course</h2>
                    </div>
                </div>
                <TitleForm
                    initialData={course}
                    courseId={course.id}
                />
            </div>
        </div>
    )
}

export default CourseDetailsPage