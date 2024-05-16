import React from 'react';
import {RouterNames, sidebarLinks} from "@/shared/enums/RouterNames.ts";
import {NavLink, useLocation} from "react-router-dom";

const LeftSidebar = () => {
    const { pathname } = useLocation();
    return (
        <nav className={"w-[15%]"}>
            <div className={"flex flex-col gap-11"}>
                <ul className={"flex flex-col gap-6 p-2 border-double border-4 border-sky-500"}>
                    {sidebarLinks.map((link) => {
                        let isActive = pathname === link.route;
                        if (pathname.split('/')[1] && pathname.split('/')[1] === "workers" && link.route === RouterNames.WORKERS.to) {
                            isActive = true
                        }
                        return (
                            <li key={link.label} className={`${isActive && 'bg-sky-300'}`}>
                                <NavLink
                                    to={link.route}
                                    className={`flex gap-4 items-center p-4  ${isActive ? 'text-white' : 'text-sky-300 font-bold'}`}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                    <li key={"logout"}>
                        <NavLink
                            to={RouterNames.LOGIN.to}
                            className={`flex gap-4 items-center p-4 text-sky-300 font-bold`}
                        >
                            Вийти
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default LeftSidebar;