import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListarOrcamentos from "../pages/listarOrcamentos/listarOrcamentos";
import Home from "../pages/home/home";
import CriarOrcamento from "../pages/criarOrcamentos/criaorcamentos";
import Login from "../pages/login/login";
import { AuthProvider } from "../pages/login/contexto/contexto";
import ProtectedRoute from "../pages/login/contexto/protectedRoute";
import Header from "../header/header";

export function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/listarorcamentos"
            element={
              <ProtectedRoute>
                <ListarOrcamentos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/criarorcamento"
            element={
              <ProtectedRoute>
                <CriarOrcamento />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
