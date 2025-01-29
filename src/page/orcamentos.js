import React, { useState } from "react";
import PercentageSelector from "./percentSelector";
import ProdutosAdicionais from "./produtosAdicionais";
import supabase from "../external/supabaseconfig";
import "./orcamentos.css";

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

export default function Orcamentos() {
  const [componentes, setComponentes] = useState({
    processador: { modelo: "", custo: 0, percent: 0 },
    placaMae: { modelo: "", custo: 0, percent: 0 },
    memoriaRam: { modelo: "", custo: 0, percent: 0 },
    armazenamento: { modelo: "", custo: 0, percent: 0 },
    gabinete: { modelo: "", custo: 0, percent: 0 },
  });
  const [produtosAdicionais, setProdutosAdicionais] = useState([]);
  const [salvando, setSalvando] = useState(false);

  const atualizarComponente = (componente, campo, valor) => {
    setComponentes((prev) => ({
      ...prev,
      [componente]: { ...prev[componente], [campo]: valor },
    }));
  };

  const adicionarProduto = () => {
    setProdutosAdicionais((prev) => [
      ...prev,
      { nome: "", valor: "", lucro: "" },
    ]);
  };

  const atualizarProduto = (index, field, value) => {
    const novosProdutos = [...produtosAdicionais];
    novosProdutos[index][field] = value;
    setProdutosAdicionais(novosProdutos);
  };

  const calcularValorFinal = () => {
    const totalComponentes = Object.values(componentes).reduce(
      (total, componente) => {
        const valorComLucro =
          componente.custo + (componente.custo * componente.percent) / 100;
        return total + valorComLucro;
      },
      0,
    );

    const totalProdutosAdicionais = produtosAdicionais.reduce(
      (total, produto) => {
        const valorComLucro =
          parseFloat(produto.valor || 0) +
          (parseFloat(produto.valor || 0) * parseFloat(produto.lucro || 0)) /
            100;
        return total + valorComLucro;
      },
      0,
    );

    return totalComponentes + totalProdutosAdicionais;
  };

  const salvarOrcamento = async () => {
    setSalvando(true);

    const orcamento = {
      componentes,
      produtosAdicionais,
      valorFinal: calcularValorFinal(),
      dataCriacao: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("orcamentos")
      .insert([orcamento]);

    if (error) {
      console.error("Erro ao salvar orçamento:", error.message);
      alert("Erro ao salvar o orçamento. Tente novamente.");
    } else {
      alert("Orçamento salvo com sucesso!");
    }

    setSalvando(false);
  };

  return (
    <div className="orcamentos">
      <form>
        <h1>Orçamentos</h1>
        <ComponenteOrcamento
          nome="Processador"
          dados={componentes.processador}
          onChange={(campo, valor) =>
            atualizarComponente("processador", campo, valor)
          }
        />
        <ComponenteOrcamento
          nome="Placa Mãe"
          dados={componentes.placaMae}
          onChange={(campo, valor) =>
            atualizarComponente("placaMae", campo, valor)
          }
        />
        <ComponenteOrcamento
          nome="Memória Ram"
          dados={componentes.memoriaRam}
          onChange={(campo, valor) =>
            atualizarComponente("memoriaRam", campo, valor)
          }
        />
        <ComponenteOrcamento
          nome="Armazenamento"
          dados={componentes.armazenamento}
          onChange={(campo, valor) =>
            atualizarComponente("armazenamento", campo, valor)
          }
        />
        <ComponenteOrcamento
          nome="Gabinete"
          dados={componentes.gabinete}
          onChange={(campo, valor) =>
            atualizarComponente("gabinete", campo, valor)
          }
        />
        <ProdutosAdicionais
          produtos={produtosAdicionais}
          onAdicionar={adicionarProduto}
          onAtualizar={atualizarProduto}
        />
        <h2>Valor Final: R$ {calcularValorFinal().toFixed(2)}</h2>
        <button type="button" onClick={salvarOrcamento} disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar Orçamento"}
        </button>
      </form>
    </div>
  );
}
