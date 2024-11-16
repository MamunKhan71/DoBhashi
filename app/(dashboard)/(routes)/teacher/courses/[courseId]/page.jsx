import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { ObjectId } from 'mongodb'
import { IconBadge } from '@/components/icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
import ChaptersForm from './_components/chapters-form'
import { auth } from '@clerk/nextjs/server'
const CourseDetailsPage = async ({ params }) => {
    const { courseId } = await params;
    if(!course) {
        
    }
    const { userId } = await auth()
    if (!ObjectId.isValid(courseId)) {
        return redirect('/')
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc"
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
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
                <div className='col-span-2'>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>Customize your course</h2>
                    </div>
                </div>
                <TitleForm
                    initialData={course}
                    courseId={course.id}
                />
                <DescriptionForm
                    initialData={course}
                    courseId={course.id}
                />
                <ImageForm
                    initialData={course}
                    courseId={course.id}
                />
                <CategoryForm
                    initialData={course}
                    courseId={course.id}
                    options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                />
                <div className='space-y-6 '>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={ListChecks} />
                            <h2 className='text-xl'>Course Chapters</h2>
                        </div>
                        <ChaptersForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className='text-xl'>Sell your course</h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>

                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={File} />
                        <h2 className='text-xl'>Resources & Attachments</h2>
                    </div>
                    <AttachmentForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsPage