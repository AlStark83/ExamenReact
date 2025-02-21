//TODO!!!: Implementar la funcionalidad de la página de empleados
/*  4. EMPLOYEES
1. Consumir la siguiente API para obtener empleados:
- https://6edeayi7ch.execute-api.us-
east1.amazonaws.com/v1/examen/employees/:tu_nombre por el método GET.
2. Mostrar los datos de los empleados en una tabla:
- Implementar un buscador.
- Paginar la tabla (10 empleados por página).
3. Implementar un formulario con los siguientes datos:
- Nombre (30 caracteres).
- Apellidos (30 caracteres).
- Fecha de nacimiento (dato será enviado en formato YYYY/MM/DD)
implementar un calendario.
- Enviar datos a la siguiente API
• https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/
employees/:tu_nombre por el método POST
• Request:
• name
• last_name
• birthday
- Actualizar los datos de tabla una vez enviado el formulario al API y limpiar
formulario.
- TODOS LOS CAMPOS SON OBLIGATORIOS. */

import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeservices";

function Employees() {
	interface Employee {
		id: string;
		name: string;
		last_name: string;
		birthday: string;
	}

	const [employees, setEmployees] = useState<Employee[]>([]);
	const [search, setSearch] = useState<string>("");
	const [currentPage, setCurrentPage] = useState(1);
	const employeesPerPage = 10;
	const [newEmployee, setNewEmployee] = useState({
		name: "",
		last_name: "",
		birthday: "",
	});

	useEffect(() => {
		getEmployees().then((data) => {
			setEmployees(data.employees);
		});
	}, []);

	const filteredEmployees = employees.filter((employee) =>
		`${employee.name} ${employee.last_name}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
	const currentEmployees = filteredEmployees.slice(
		indexOfFirstEmployee,
		indexOfLastEmployee
	);
	const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
	};

	const handleAddEmployee = async () => {
		if (!newEmployee.name || !newEmployee.last_name || !newEmployee.birthday) {
			alert("Todos los campos son obligatorios.");
			return;
		}

		try {
			const response = await fetch(
				"https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/alberto_guerrero",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newEmployee),
				}
			);
			const responseData = await response.json();
			console.log(responseData);

			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}

			const updatedEmployees = await 	getEmployees().then((data) => {
        setEmployees(data.employees);
      });
      
			console.log( updatedEmployees);
      
      setCurrentPage(Math.ceil(employees.length / employeesPerPage));
			setNewEmployee({ name: "", last_name: "", birthday: "" });
		} catch (error) {
			console.error("Error al agregar empleado:", error);
		}
	};

	return (
		<div>
			<h2>Empleados</h2>
			<input
				type="text"
				placeholder="Buscar empleado"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<table border={1}>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Fecha de nacimiento</th>
					</tr>
				</thead>
				<tbody>
					{currentEmployees.map((employee) => (
						<tr key={employee.id}>
							<td>{employee.name}</td>
							<td>{employee.last_name}</td>
							<td>{new Date(employee.birthday).toLocaleDateString()}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}>
					Anterior
				</button>
				<span>
					{" "}
					Página {currentPage} de {totalPages}{" "}
				</span>
				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === totalPages}>
					Siguiente
				</button>
			</div>
			<h3>Agregar Empleado</h3>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddEmployee();
				}}>
				<input
					type="text"
					name="name"
					placeholder="Nombre (máx 30 caracteres)"
					value={newEmployee.name}
					onChange={handleInputChange}
					maxLength={30}
				/>
				<input
					type="text"
					name="last_name"
					placeholder="Apellido (máx 30 caracteres)"
					value={newEmployee.last_name}
					onChange={handleInputChange}
					maxLength={30}
				/>
				<input
					type="date"
					name="birthday"
					value={newEmployee.birthday}
					onChange={handleInputChange}
				/>
				<button type="submit">Agregar</button>
			</form>
		</div>
	);
}

export default Employees;
