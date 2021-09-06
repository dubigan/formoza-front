import React from "react";
import Header from "./layout/Header";

type TLayoutProps = { children: React.ReactNode };
const Layout = ({ children }: TLayoutProps) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;
