import Footer from "./footer/footer";
import ListarOrcamentos from "./pages/listarOrcamentos/listarOrcamentos";
import CriarOrcamento from "./pages/criarOrcamentos/criaorcamentos";
import { AppRouter } from "./routes/routes";

function App() {
  return (
    <div>
      <h1>first</h1>
      <AppRouter />
      <CriarOrcamento />
      <ListarOrcamentos />
      <Footer />
    </div>
  );
}

export default App;
