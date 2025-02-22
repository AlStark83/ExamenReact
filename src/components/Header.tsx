//TODO!!! Crear un componente Header que contenga un hashrouting y rutas dinámicas.

/*Header: Deberá contener un hashrouting
2. Rutas publicas:
1. Login
3. Rutas protegidas
1. Employees
2. Upload
4. Si se coloca una path inexistente y no tiene una sesión activa, redirect a HOME,
si existe una sesión, redirect a Employees.
*/
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Header.module.css";

const Header = () => {
	const { user, logout } = useAuth();

	return (
		<nav className={styles.header}>
			<div className={styles.logo}>
				<Link to="/">Examen React</Link>
			</div>
			<div className={styles.links}>
				{!user ? (
					<Link to="/login" className={styles.link}>
						Login
					</Link>
				) : (
					<>
						<Link to="/employees" className={styles.link}>
							Employees
						</Link>
						<Link to="/upload" className={styles.link}>
							Upload
						</Link>
						<button onClick={logout} className={styles.buttonPrimary}>
							Logout
						</button>
					</>
				)}
			</div>
		</nav>
	);
};

export default Header;
