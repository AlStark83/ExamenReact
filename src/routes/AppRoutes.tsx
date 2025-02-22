import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Employees from "../pages/Employees.tsx";
import Home from "../pages/Home.tsx";
import Upload from "../pages/Upload.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Header from "../components/Header.tsx";
import { useEffect, useState } from "react";

function AppRoutes() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("user");
		setIsAuthenticated(!!user);
	}, []);
	return (
		<HashRouter>
			<Header
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			/>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/employees" element={<Employees />} />
					<Route path="/upload" element={<Upload />} />
				</Route>
				<Route path="*" element={<Home />} />
			</Routes>
		</HashRouter>
	);
}

export default AppRoutes;
