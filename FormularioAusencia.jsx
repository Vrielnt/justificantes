import React, { useState } from "react";
import axios from "axios";

const FormularioAusencia = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    grupo: "",
    motivo: "",
    fecha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/ausencias", formData);
      alert("Datos enviados correctamente ✅");
      setFormData({ nombre: "", grupo: "", motivo: "", fecha: "" });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registro de Ausencia</h2>

      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label>Grupo:</label>
      <input
        type="text"
        name="grupo"
        value={formData.grupo}
        onChange={handleChange}
        required
      />

      <label>Motivo:</label>
      <textarea
        name="motivo"
        value={formData.motivo}
        onChange={handleChange}
        required
      />

      <label>Fecha de ausencia:</label>
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />

      <button type="submit">Enviar</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "40px auto",
    gap: "10px",
  },
};

export default FormularioAusencia;
