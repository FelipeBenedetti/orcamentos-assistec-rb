import React, { useState } from "react";
import ProdutosAdicionais from "../../components/produtosAdicionais";
import supabase from "../../external/supabaseconfig";
import "./criarorcamento.css";
import ComponenteOrcamento from "../../components/componenteOrcamento";

export default function CriarOrcamento() {
  const [componentes, setComponentes] = useState({
    cliente: "",
    processador: { modelo: "", custo: 0, percent: 0, quantidade: 1 },
    placaMae: { modelo: "", custo: 0, percent: 0, quantidade: 1 },
    memoriaRam: { modelo: "", custo: 0, percent: 0, quantidade: 1 },
    armazenamento: { modelo: "", custo: 0, percent: 0, quantidade: 1 },
    gabinete: { modelo: "", custo: 0, percent: 0, quantidade: 1 },
  });

  const [produtosAdicionais, setProdutosAdicionais] = useState([]);
  const [salvando, setSalvando] = useState(false);

  // Atualiza qualquer componente
  const atualizarComponente = (componente, campo, valor) => {
    setComponentes((prev) => ({
      ...prev,
      [componente]: { ...prev[componente], [campo]: valor },
    }));
  };

  // Adiciona um novo produto
  const adicionarProduto = () => {
    setProdutosAdicionais((prev) => [
      ...prev,
      { nome: "", valor: "", lucro: "", quantidade: 1 },
    ]);
  };

  // Atualiza um produto adicional
  const atualizarProduto = (index, field, value) => {
    const novosProdutos = [...produtosAdicionais];
    novosProdutos[index][field] = value;
    setProdutosAdicionais(novosProdutos);
  };

  // Função que calcula o valor final do orçamento
  const calcularValorFinal = () => {
    // Soma os valores dos componentes
    const totalComponentes = Object.entries(componentes)
      .filter(([key]) => key !== "cliente") // Removemos "cliente"
      .reduce((total, [, componente]) => {
        const custo = Number(componente.custo) || 0;
        const percent = Number(componente.percent) || 0;
        const valorComLucro = custo + (custo * percent) / 100;
        return total + valorComLucro * (componente.quantidade || 1); // Multiplicando pela quantidade
      }, 0);

    // Soma os valores dos produtos adicionais
    const totalProdutosAdicionais = produtosAdicionais.reduce(
      (total, produto) => {
        const valor = Number(produto.valor) || 0;
        const lucro = Number(produto.lucro) || 0;
        const quantidade = Number(produto.quantidade) || 1; // Multiplica pela quantidade
        const valorComLucro = valor + (valor * lucro) / 100;
        return total + valorComLucro * quantidade; // Considera a quantidade no cálculo
      },
      0
    );

    return totalComponentes + totalProdutosAdicionais;
  };

  // Função para salvar o orçamento no banco
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
