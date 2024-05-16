import React from 'react';
import {Outlet} from "react-router-dom";
import LeftSidebar from "@/widgets/LeftSidebar.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import ico from "@/assets/img.png"
import { Toaster } from "@/components/ui/toaster"

const MainPage = () => {
    return (
        <div className={"flex flex-col h-screen"}>
            <header
                className={"flex gap-4 place-content-between p-2 justify-center items-center border-y-2 border-black mx-5 rounded-xl"}>
                <span className={"text-lg font-bold"}>
                    АВТОМАТИЗАЦІЯ ЗБОРУ
                </span>
                <Avatar>
                    <AvatarImage src={ico} width={70} className={"rounded-2xl"}/>
                    <AvatarFallback>LOGO</AvatarFallback>
                </Avatar>
                <span className={"text-lg font-bold"}>
                    НАУКОВИХ ДОСЯГНЕНЬ
                </span>
            </header>
            <main className={"w-full flex gap-10 py-10 px-5 "}>
                <LeftSidebar/>
                <section className={"flex flex-1 h-full"}>
                    <Outlet/>
                    <Toaster/>
                </section>
            </main>
        </div>
    );
};

export default MainPage;