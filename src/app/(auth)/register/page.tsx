import Register from '@/components/(auth)/register/Register'
import React from 'react'

const page = () => {
    return (
        <div className="bg-[#FFFFFF] text-black tracking-tight">
            <div className="container lg:px-[30px] px-2 tracking-tight">
                <Register />
            </div>
        </div>
    )
}

export default page