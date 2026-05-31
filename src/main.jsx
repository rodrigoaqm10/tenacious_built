import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px", textAlign: "center", color: "#f0eaed", fontFamily: "Inter, sans-serif" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Algo salió mal</h1>
          <p style={{ color: "#9a8f96", marginBottom: "20px" }}>Hubo un error cargando la página.</p>
          <button onClick={() => { this.setState({ hasError: false }); window.location.href = "/"; }} style={{ padding: "12px 24px", background: "#d4a0b9", color: "#2a0f1c", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
