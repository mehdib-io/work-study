import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    );
};

export default AppRouter;
