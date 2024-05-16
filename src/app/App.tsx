import React from 'react';
import './index.css'
import {withProviders} from "@/app/provider";
import Routing from "@/pages";

const App = () => {
    return (
        <>
            <Routing/>
        </>
    );
};

export default withProviders(App);