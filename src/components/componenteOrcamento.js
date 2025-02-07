import PercentageSelector from "./dropdownSelector";
import "../pages/criarOrcamentos/criarorcamento.css";

const ComponenteOrcamento = ({ nome, dados, onChange }) => {
  // Função para garantir que o valor seja válido para número
  const handleNumberChange = (campo, valor) => {
    const numero = Number(valor);
    onChange(campo, isNaN(numero) ? 0 : numero);
  };

  // Função para garantir que a quantidade seja maior ou igual a 1
  const handleQuantidadeChange = (campo, valor) => {
    const novaQuantidade = Math.max(1, Number(valor) || 1); // Impede valores negativos ou zero
    onChange(campo, novaQuantidade);
  };

  return (
    <label>
      <h1> {nome} </h1>
      <h4> Modelo </h4>
      <input
        type="text"
        placeholder={`Insira aqui o modelo do ${nome}`}
        value={dados.modelo}
        onChange={(e) => onChange("modelo", e.target.value)}
      />
      <h4>Custo</h4>
      <input
        type="number"
        placeholder={`Insira aqui o custo do ${nome}`}
        value={dados.custo}
        onChange={(e) => handleNumberChange("custo", e.target.value)}
      />
      <h4>Margem de Lucro </h4>
      <PercentageSelector
        label={`Lucro sobre ${nome}:`}
        value={dados.percent}
        onChange={(value) => onChange("percent", value)}
      />
      <h4>Quantidade</h4>
      <input
        type="number"
        min="1" // Garante que o valor mínimo seja 1
        placeholder={`Insira aqui a quantidade de ${nome}`}
        value={dados.quantidade}
        onChange={(e) => handleQuantidadeChange("quantidade", e.target.value)}
      />
    </label>
  );
};

export default ComponenteOrcamento;
