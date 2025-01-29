import React from "react";
import PercentageSelector from "./percentSelector";

export default function ProdutosAdicionais({
  produtos,
  onAdicionar,
  onAtualizar,
}) {
  return (
    <div>
      <h2>Produtos Adicionais</h2>
      {produtos.map((produto, index) => (
        <div key={index} className="produto-adicional">
          <label>
            Nome do Produto:
            <input
              type="text"
              value={produto.nome}
              placeholder="Nome do produto"
              onChange={(e) => onAtualizar(index, "nome", e.target.value)}
            />
          </label>
          <label>
            Valor de Custo:
            <input
              type="number"
              value={produto.valor}
              placeholder="Valor de custo"
              onChange={(e) => onAtualizar(index, "valor", e.target.value)}
            />
          </label>
          <PercentageSelector
            label="Lucro:"
            value={produto.lucro}
            onChange={(value) => onAtualizar(index, "lucro", value)}
          />
        </div>
      ))}
      <button type="button" onClick={onAdicionar}>
        Adicionar Produto Adicional
      </button>
    </div>
  );
}

/*
const calcularValorFinal = () => {
  const lucro = (processadorCusto * processadorPercent) / 100;
  const valorFinal = processadorCusto + lucro;
  setValorFinal(valorFinal.toFixed(2));
};

const handleSubmit = (e) => {
  e.preventDefault();
  calcularValorFinal();
}; 

return (
  <form onSubmit={handleSubmit}>
    <h1>Gerar Orçamentos</h1>
    <label>
      Processador:
      <input
        type="text"
        placeholder="Insira aqui o modelo da CPU"
        value={processadorModelo}
        onChange={(e) => setProcessadorModelo(e.target.value)}
      />
*/
