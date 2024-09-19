import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function RequireAuthentication({ allowedRoles }){
    const role = localStorage.getItem("auth_role");

    return (
        !role ? <Navigate to="/" />
        : role === `${allowedRoles}`
            ? <Outlet />
            : <Navigate to="/unauthorized" />
    )
}