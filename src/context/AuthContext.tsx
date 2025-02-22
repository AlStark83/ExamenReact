import { createContext, useContext, useState, useMemo } from "react";
import { ReactNode, useEffect } from "react";

interface User {
	username: string;
}

const AuthContext = createContext<{
	user: User | null;
	login: (username: string, password: string) => boolean;
	logout: () => void;
}>({
	user: null,
	login: () => false,
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (username: string, password: string): boolean => {
		const validUsername = import.meta.env.VITE_APP_USERNAME;
		const validPassword = import.meta.env.VITE_APP_PASSWORD;

		if (username === validUsername && password === validPassword) {
			const newUser = { username };
			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
			return true;
		}
		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	const contextValue = useMemo(() => ({ user, login, logout }), [user]);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
