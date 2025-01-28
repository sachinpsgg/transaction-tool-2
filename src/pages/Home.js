import React, { useState } from "react";

import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div className="flex h-screen">
            <Sidebar/>
           <Outlet/>
        </div>
    );
};

export default Home;
