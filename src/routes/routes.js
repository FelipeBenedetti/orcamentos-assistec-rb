import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ListarOrcamentos from "../pages/listarOrcamentos/listarOrcamentos";
import Home from "../home/home";
import CriarOrcamento from "../pages/criarOrcamentos/criaorcamentos";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={ListarOrcamentos} path="/listarorcamentos" />
        <Route Component={CriarOrcamento} path="/criarorcamento" />
      </Routes>
    </BrowserRouter>
  );
}
