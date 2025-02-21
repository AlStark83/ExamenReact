import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Employees from "../pages/Employees.tsx";
import Home from "../pages/Home.tsx";
import Upload from "../pages/Upload.tsx";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" Component={Login} />
				<Route path="/employees" Component={Employees} />
				<Route path="/upload" Component={Upload} />
				<Route path="*" Component={Home} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
