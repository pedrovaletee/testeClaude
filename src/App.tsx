import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Listagem } from "./pages/Listagem";
import { Cadastro } from "./pages/Cadastro";
import { Detalhes } from "./pages/Detalhes";
import { Favoritos } from "./pages/Favoritos";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Listagem />} />
          <Route path="/novo" element={<Cadastro />} />
          <Route path="/anuncio/:id" element={<Detalhes />} />
          <Route path="/anuncio/:id/editar" element={<Cadastro />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
