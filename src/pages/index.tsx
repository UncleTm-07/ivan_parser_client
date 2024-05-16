import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "@/pages/MainPage.tsx";
import {RouterNames} from "@/shared/enums/RouterNames.ts";
import HomeBlock from "@/widgets/HomeBlock.tsx";
import WorkersBlock from "@/widgets/Workers/WorkersBlock.tsx";
import AuthPage from "@/pages/AuthPage.tsx";
import LoginBlock from "@/widgets/AuthBlock/LoginBlock.tsx";
import RegistrationBlock from "@/widgets/AuthBlock/RegistrationBlock.tsx";
import WorkerBlockById from "@/widgets/Workers/WorkerBlockById.tsx";

const Routing = () => {
    return (
        <Routes>
            <Route element={<MainPage/> } >
                <Route path={RouterNames.HOME.to} element={<HomeBlock/>}/>
                <Route path={RouterNames.WORKERS.to} element={<WorkersBlock/>}/>
                <Route path={RouterNames.WORKER.to} element={<WorkerBlockById/>}/>
            </Route>
            <Route element={<AuthPage/> } >
                <Route path={RouterNames.LOGIN.to} element={<LoginBlock/>}/>
                <Route path={RouterNames.REGISTRATION.to} element={<RegistrationBlock/>}/>
            </Route>
        </Routes>
    );
};

export default Routing;