// const API_URL = "api/v1/examen/employees/alberto_guerrero";
const API_URL = "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/alberto_guerrero";


export const getEmployees = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data.data);
    return data.data;
    
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return [];
  }
};
