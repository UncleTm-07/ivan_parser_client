import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import logo from "@/assets/img_1.png"
import {Toaster} from "@/components/ui/toaster.tsx";

const AuthPage = () => {
    const isAuthenticated = false;
    return (
        <>
            {isAuthenticated ? (
                    <Navigate to={'/'}/>
                )
                :(
                    <div className={"flex"}>
                        <img
                            src={logo}
                            alt={"logo"}
                            className={"hidden xl:block h-screen w-1/2 object-cover bg-no-repeat rounded-r-xl"}
                        />

                        <section className={"flex flex-1 justify-center items-center flex-col py-10"}>
                            <Outlet/>
                            <Toaster/>
                        </section>
                    </div>
                )}
        </>
    );
};

export default AuthPage;