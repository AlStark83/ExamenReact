# 📘 Proyecto React - Examen Técnico

## 📌 Descripción

Este proyecto es una aplicación de React con TypeScript que incluye autenticación con Context API, consumo de API para gestionar empleados, paginación, búsqueda y un formulario para agregar empleados. También se ha implementado manejo de rutas protegidas y variables de entorno.

---

## 🚀 Instrucciones para Correr el Proyecto

### 1️⃣ **Clonar el Repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2️⃣ **Instalar Dependencias**

```bash
npm install
```

### 3️⃣ **Configurar Variables de Entorno**

Antes de ejecutar el proyecto, crea un archivo `.env` en la raíz del proyecto y copia el contenido de `.env.example`, llenándolo con tus credenciales:

```env
VITE_APP_USERNAME=tu_usuario
VITE_APP_PASSWORD=tu_contraseña
```

### 4️⃣ **Ejecutar el Proyecto en Modo Desarrollo**

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5173/`.

---

## 🏗️ **Generar Build para Producción**

Para generar la versión optimizada para producción, ejecuta:

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `/dist/`. Puedes desplegar esta carpeta en cualquier servicio de hosting estático.

---

## 🔐 **Credenciales de Prueba**

Para realizar un login exitoso, usa las siguientes credenciales:

```plaintext
Usuario: Aquí usa lo que colocaste en VITE_APP_USERNAME en el archivo .env
Contraseña: Aquí usa lo que colocaste en VITE_APP_PASSWORD en el archivo .env
```

Estas credenciales están definidas en las variables de entorno.

---

## 🛠 **Dependencias Principales**

- React + Vite + TypeScript
- React Router Dom
- Context API

---

## 📝 **Notas Adicionales**

Si experimentas errores relacionados con CORS al consumir la API de empleados, asegúrate de que la API esté operativa accediendo a la URL en el navegador.

Si tienes dudas o necesitas soporte, puedes contactarme. 🚀

