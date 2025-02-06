import React, { useState } from "react";
import ProdutosAdicionais from "../../components/produtosAdicionais";
import supabase from "../../external/supabaseconfig";
import "./criarorcamento.css";
import ComponenteOrcamento from "../../components/componenteOrcamento";

export default function CriarOrcamento() {
  const [componentes, setComponentes] = useState({
    cliente: "",
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
    const totalComponentes = Object.entries(componentes)
      .filter(([key]) => key !== "cliente") // 🔹 Removemos "cliente"
      .reduce((total, [, componente]) => {
        const custo = Number(componente.custo) || 0;
        const percent = Number(componente.percent) || 0;
        const valorComLucro = custo + (custo * percent) / 100;
        return total + valorComLucro;
      }, 0);

    const totalProdutosAdicionais = produtosAdicionais.reduce(
      (total, produto) => {
        const valor = Number(produto.valor) || 0;
        const lucro = Number(produto.lucro) || 0;
        const valorComLucro = valor + (valor * lucro) / 100;
        return total + valorComLucro;
      },
      0,
    );

    return totalComponentes + totalProdutosAdicionais;
  };

  const salvarOrcamento = async () => {
    setSalvando(true);

    const orcamento = {
      cliente: componentes.cliente,
      componentes,
      produtos_adicionais: produtosAdicionais,
      valor_final: calcularValorFinal(),
      data_criacao: new Date().toISOString(),
    };

    console.log("Salvando orçamento:", JSON.stringify(orcamento, null, 2));

    const { data, error } = await supabase
      .from("orcamentos")
      .insert([orcamento]);

    if (error) {
      console.error("Erro ao salvar orçamento:", error);
      alert(`Erro ao salvar: ${error.message}`);
    } else {
      console.log("Orçamento salvo:", data);
      alert("Orçamento salvo com sucesso!");
    }

    setSalvando(false);
  };

  return (
    <div className="orcamentos">
      <form>
        <h1>Orçamentos</h1>
        <label>
          Cliente:
          <input
            type="text"
            placeholder="Insira o nome do cliente"
            value={componentes.cliente}
            onChange={(e) =>
              setComponentes((prev) => ({ ...prev, cliente: e.target.value }))
            }
          />
        </label>

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
