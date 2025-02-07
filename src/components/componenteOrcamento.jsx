import PercentageSelector from "./dropdownSelector";
//import "../pages/criarOrcamentos/criarorcamento.css";
import './componenteOrcamento.css'

const ComponenteOrcamento = ({ nome, dados, onChange }) => {
  const handleNumberChange = (campo, valor) => {
    const numero = Number(valor);
    onChange(campo, isNaN(numero) ? 0 : numero);
  };

  const handleQuantidadeChange = (campo, valor) => {
    const novaQuantidade = Math.max(1, Number(valor) || 1);
    onChange(campo, novaQuantidade);
  };

  return (
    <div className="componente-orcamento">
      <label>
        <h1>{nome}</h1>
        {nome === "Cliente" ? (
          <>
            <h4>Nome do Cliente:</h4>
            <input
              type="text"
              placeholder="Insira o nome do cliente"
              value={dados.cliente}
              onChange={(e) => onChange("cliente", e.target.value)}
            />
          </>
        ) : (
          <>
            <h4>Modelo:</h4>
            <input
              type="text"
              placeholder={`Modelo do ${nome}`}
              value={dados.modelo}
              onChange={(e) => onChange("modelo", e.target.value)}
            />
            <h4>Custo:</h4>
            <input
              type="number"
              placeholder={`Custo do ${nome}`}
              value={dados.custo}
              onChange={(e) => handleNumberChange("custo", e.target.value)}
            />
            <h4>Margem de Lucro:</h4>
            <PercentageSelector
              value={dados.percent}
              onChange={(value) => onChange("percent", value)}
            />
            <h4>Quantidade:</h4>
            <input
              type="number"
              min="1"
              placeholder={`Quantidade de ${nome}`}
              value={dados.quantidade}
              onChange={(e) =>
                handleQuantidadeChange("quantidade", e.target.value)
              }
            />
          </>
        )}
      </label>
    </div>
  );
};

export default ComponenteOrcamento;
