import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return ( 
        <div className="w-64 h-full bg-white shadow-md flex flex-col p-4">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            
        </div>
    )
}