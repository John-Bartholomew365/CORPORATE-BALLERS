import Image from 'next/image'
import React from 'react'

const Register = () => {
    return (
        <div className='mt-12'>
            <div className="flex gap-3 justify-center items-center mb-6">
                <Image
                    src="/corporate-ballers.svg"
                    alt="Logo"
                    width={0}
                    height={0}
                    className="w-[70px] h-[70px]"
                />
                <div className='flex-col leading-tight'>
                    <h1 className="text-black text-[22px]">Corporate</h1>
                    <h1 className="text-black text-[22px]">Ballers</h1>
                </div>
            </div>

            <div className="pt-6 text-center">
                <h2 className="font-bold text-[30px] leading-tight">
                    Join the Legacy of Champions
                </h2>
                <p className="opacity-70 text-[14px] mt-3 mb-8">
                    Welcome to <strong>Corporate Ballers Football Academy (CBFA)</strong> <br /> — a fast-rising football powerhouse
                    based in Ilorin, Kwara State. <br />
                </p>
            </div>


            <div>
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register