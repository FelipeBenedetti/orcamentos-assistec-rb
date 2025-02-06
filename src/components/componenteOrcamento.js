import PercentageSelector from "./dropdownSelector";

const ComponenteOrcamento = ({ nome, dados, onChange }) => (
  <label>
    {nome}:
    <input
      type="text"
      placeholder={`Insira aqui o modelo do ${nome}`}
      value={dados.modelo}
      onChange={(e) => onChange("modelo", e.target.value)}
    />
    <input
      type="number"
      placeholder={`Insira aqui o custo do ${nome}`}
      value={dados.custo}
      onChange={(e) => onChange("custo", Number(e.target.value) || 0)}
    />
    <PercentageSelector
      label={`Lucro sobre ${nome}:`}
      value={dados.percent}
      onChange={(value) => onChange("percent", value)}
    />
  </label>
);

export default ComponenteOrcamento;
