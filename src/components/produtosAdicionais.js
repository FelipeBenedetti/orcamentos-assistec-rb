import React from "react";
import PercentageSelector from "./dropdownSelector";

export default function ProdutosAdicionais({
  produtos,
  onAdicionar,
  onAtualizar,
}) {
  // Função para garantir que o valor seja numérico e válido
  const handleValueChange = (index, field, value) => {
    const numero = Number(value);
    onAtualizar(index, field, isNaN(numero) ? 0 : numero); // Se o valor não for um número, substitui por 0
  };

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
              onChange={(e) =>
                handleValueChange(index, "valor", e.target.value)
              }
            />
          </label>

          <label>
            Quantidade:
            <input
              type="number"
              min="1" // Garante que o valor mínimo seja 1
              value={produto.quantidade}
              placeholder="Quantidade"
              onChange={(e) => {
                const novaQuantidade = Math.max(1, Number(e.target.value) || 1); // Evita valores negativos ou zero
                onAtualizar(index, "quantidade", novaQuantidade);
              }}
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
        Adicionar Produto
      </button>
    </div>
  );
}
