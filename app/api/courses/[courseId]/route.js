import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function PATCH(request, { params }) {
    try {
        const { courseId } = params
        const { userId } = await auth()
        const values = await request.json()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId: userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log("[Course ID] ", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
