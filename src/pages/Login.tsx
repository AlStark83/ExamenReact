//TODO!!! implementar un fake login

/*3. LOGIN
1. Implementar un “fake login” (sin consumir algún web service).
2. Datos para realizar login:
• Usuario
• Contraseña
3. Validar que no se pueda copiar y pegar datos dentro de esos campos.*/
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Credentials {
	username: string;
	password: string;
}

type LoginProps = object;

const Login: React.FC<LoginProps> = () => {
	const login = useAuth().login;
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState<Credentials>({
		username: "",
		password: "",
	});
	const [error, setError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const success = login(credentials.username, credentials.password);
      
			if (success) {
        navigate("/employees");
        return;
			} else {
        console.log(credentials.username, credentials.password);
				setError("Usuario o contraseña incorrectos");
			}
		} catch (error) {
			setError(`Usuario o contraseña incorrectos ${error}`);
		}
	};

	return (
		<div>
			<h2>Iniciar Sesión</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					placeholder="Usuario"
					value={credentials.username}
					onChange={handleChange}
					autoComplete="off"
					onPaste={(e) => e.preventDefault()}
				/>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={credentials.password}
					onChange={handleChange}
					autoComplete="off"
					onPaste={(e) => e.preventDefault()}
				/>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<button type="submit">Iniciar Sesión</button>
			</form>
		</div>
	);
};

export default Login;
