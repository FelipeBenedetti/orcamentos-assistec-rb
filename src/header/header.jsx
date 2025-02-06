import { Link } from "react-router-dom"; // Importe o Link
import "./header.css";

function Header() {
  return (
    <header className="cabecalho">
      <ul className="lista">
        <li className="logo">
          <img src="/logosemfundo.png" alt="Logo" className="logo-img" />
        </li>
        <li className="lista-items">
          <Link className="lista-link" to="/">
            Inicio
          </Link>
        </li>
        <li>
          <Link className="lista-link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="lista-link" to="/listarorcamentos">
            Ver Orçamentos
          </Link>
        </li>
        <li>
          <Link className="lista-link" to="/criarorcamento">
            Criar Orçamentos
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
