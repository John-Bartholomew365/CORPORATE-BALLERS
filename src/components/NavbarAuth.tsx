import Image from "next/image";
import React from "react";

const NavbarAuth = () => {
    return (
        <div>
            <div className="py-4 lg:px-[70px] px-[30px] w-full z-50 bg-[#FFFFFF] border-b border-black/10 fixed gap-2 font-navbar flex items-center">
                <Image
                    src="/corporate-ballers.svg"
                    alt="Logo"
                    width={0}
                    height={0}
                    className="w-[70px] h-[70px]"
                />
                <h1 className="text-black text-[22px]">Corporate Ballers</h1>
            </div>
        </div>
    );
};

export default NavbarAuth;
