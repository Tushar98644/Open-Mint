"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { isLoggedIn } from "@/components/connect-button/actions/auth";
import React from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const [refresh, setRefresh] = useState(false); // Trigger state for re-checking login status

    const checkLoginStatus = useCallback(async () => {
        try {
            const result = await isLoggedIn();
            console.log("Login status:", result); // Debug log
            setLoggedIn(result);
        } catch (error) {
            console.error("Error checking login status:", error);
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus, refresh]); // Trigger when `refresh` changes

    useEffect(() => {
        if (loggedIn === null) return;

        if (loggedIn) {
            if (pathname === "/login") {
                console.log("Redirecting to home...");
                router.push("/");
            }
        } else {
            if (pathname !== "/login") {
                console.log("Redirecting to login...");
                router.push("/login");
            }
        }
    }, [loggedIn, pathname, router]);

    const refreshLoginStatus = useCallback(() => {
        setRefresh((prev) => !prev); // Toggle refresh state
    }, []);

    if (loggedIn === null) {
        return <div>Loading...</div>; // Replace with your Loader component if available
    }

    return (
        <>
            {React.cloneElement(children as React.ReactElement, { refreshLoginStatus })}
        </>
    );
};
