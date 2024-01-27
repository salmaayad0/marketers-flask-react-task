import { Outlet } from "react-router-dom";
import Background from "../styles/Background";


function Layout() {
    return (
        <Background>
            <main className="flex flex-col justify-center items-center min-h-screen">
                <Outlet />
            </main>
            <div className="starField fixed top-0 left-0 w-full h-full z-1">
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>
            </div>
        </Background>
    );
}

export default Layout;
