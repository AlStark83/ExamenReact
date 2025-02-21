//TODO!!! Implementar un drag & drop para Upload

/*5. UPLOAD
1. Implementar un “drag&drop”, sección donde se podrá arrastrar un archivo tipo
imagen (png, jpeg, jpg) y soltarlo dentro.
2. Realizar un “preview” de la o las imágenes arrastradas.
3. Una vez mostrado el “preview”, colocar un botón para cargar todas las imágenes
a algún storage.
4. Se deberá poder visualizar todas las imágenes, con una flecha a visualizar la
siguiente.*/

import { useState } from "react";

const Upload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    if (files.length === 0) {
      alert("Solo se permiten imágenes en formato PNG, JPEG o JPG.");
      return;
    }

    setImages([...images, ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = files.filter((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Solo se permiten imágenes en formato PNG, JPEG o JPG.");
      return;
    }

    setImages([...images, ...validFiles]);
  };

  const handleUpload = () => {
    if (images.length === 0) {
      alert("No hay imágenes para subir.");
      return;
    }

    alert(`Subiendo ${images.length} imágenes... 🚀`);
    setTimeout(() => {
      alert("¡Imágenes subidas correctamente!");
      setImages([]); 
      setCurrentIndex(0);
    }, 2000);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Subir Imágenes</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "100%",
          height: "200px",
          border: "2px dashed #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Arrastra y suelta tus imágenes aquí
      </div>

      <input type="file" accept="image/png, image/jpeg, image/jpg" multiple onChange={handleFileSelect} />

      {images.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Vista previa</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
            >
              ◀
            </button>

            <img
              src={URL.createObjectURL(images[currentIndex])}
              alt="Vista previa"
              style={{ maxWidth: "300px", maxHeight: "200px", margin: "0 10px" }}
            />

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))}
              disabled={currentIndex === images.length - 1}
            >
              ▶
            </button>
          </div>

          <button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
            Subir Imágenes
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
