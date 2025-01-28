import React from 'react';
import {Link, useLocation} from "react-router-dom";
import '../styles/sidebar.css'
import {ClaimIcon, FilesIcon, PaymentIcon, PhysicianIcon, TransactionIcon} from "../helpers/Icons";
import ProfileCard from "./ProfileCard";

const Sidebar = (props) => {
    const location = useLocation();
    const links = [
        {path: "/dashboard/claims", label: "Claims", Icon: ClaimIcon},
        {path: "/dashboard/physician", label: "Physician", Icon: PhysicianIcon},
        {path: "/dashboard/files", label: "Files", Icon: FilesIcon},
        {path: "/dashboard/payments", label: "Payments", Icon: PaymentIcon},
    ];
    return (
        <>
            <div className="flex h-screen">
                <div className="bg-[#F7F7F9] w-52 relative">
                    <div className="flex items-center p-4 mt-4">
                        <TransactionIcon w="60" h="60"/>
                        <span className="ml-2 leading-5 text-[#8650e3] font-semibold font-lato text-[16px]">TRANSACTION MANAGER</span>
                    </div>
                    <div className="mt-12 px-4 flex flex-col gap-4">
                        {links.map(({path, label, Icon}) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center px-2 w-44 py-2 mt-2 ml-1 rounded-lg cursor-pointer transition-all duration-200 ${
                                    location.pathname === path
                                        ? 'bg-[#E6E5E9] text-[#6E39CB] before:absolute ' +
                                        ' before:left-0 before:h-10 before:w-1.5 before:bg-[#6E39CB] before:rounded-r-lg'
                                        : 'bg-[#F7F7F9] text-[#263D50]'
                                } hover:bg-[#E6E5E9] hover:text-purple-600`}
                            >
                                <Icon/>
                                <span className="ml-2">{label}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-11/12">
                        <ProfileCard/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;