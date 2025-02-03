import { Link } from "react-router-dom"; // Importe o Link

function Header() {
  return (
    <header>
      <ul>
        <li><Link to="/listarorcamentos">Inicio</Link></li> 
        <li><Link to="/listarorcamentos">Ver Orçamentos</Link></li> 
        <li><Link to="/criarorcamento">Criar Orçamentos</Link></li> 
      </ul>
    </header>
  );
}

export default Header;
