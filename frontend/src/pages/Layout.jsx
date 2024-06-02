import { Outlet } from "react-router-dom";
import '../styles/layout.css'

const Layout = () => {
    return (
        <div className="cont">
            <div style={{overflow: "auto"}}>
                <Outlet/>
            </div>
        </div>
    )
};

export default Layout;