import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://<YOUR_SUPABASE_PROJECT>.supabase.co",
  "<YOUR_SUPABASE_ANON_KEY>",
);

export default function ListarOrcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Buscar todos os orçamentos ao carregar a página
  useEffect(() => {
    const buscarOrcamentos = async () => {
      const { data, error } = await supabase.from("orcamentos").select("*");

      if (error) {
        console.error("Erro ao buscar orçamentos:", error.message);
      } else {
        setOrcamentos(data);
      }
      setCarregando(false);
    };

    buscarOrcamentos();
  }, []);

  // Função para excluir um orçamento
  const excluirOrcamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este orçamento?"))
      return;

    const { error } = await supabase.from("orcamentos").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir orçamento:", error.message);
      alert("Erro ao excluir o orçamento.");
    } else {
      alert("Orçamento excluído com sucesso!");
      setOrcamentos(orcamentos.filter((orc) => orc.id !== id)); // Remove da lista
    }
  };

  return (
    <div>
      <h1>Lista de Orçamentos</h1>
      {carregando ? <p>Carregando orçamentos...</p> : null}

      <ul>
        {orcamentos.map((orcamento) => (
          <li key={orcamento.id}>
            <strong>ID:</strong> {orcamento.id} - <strong>Valor Final:</strong>{" "}
            R$ {orcamento.valorFinal.toFixed(2)}
            <button onClick={() => setOrcamentoSelecionado(orcamento)}>
              Abrir
            </button>
            <button
              onClick={() => excluirOrcamento(orcamento.id)}
              style={{ color: "red" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {orcamentoSelecionado && (
        <div>
          <h2>Detalhes do Orçamento</h2>
          <p>
            <strong>ID:</strong> {orcamentoSelecionado.id}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {new Date(orcamentoSelecionado.dataCriacao).toLocaleDateString()}
          </p>
          <h3>Componentes:</h3>
          <ul>
            {Object.entries(orcamentoSelecionado.componentes).map(
              ([key, comp]) => (
                <li key={key}>
                  <strong>{key}:</strong> {comp.modelo} - R${" "}
                  {comp.custo.toFixed(2)} (+{comp.percent}%)
                </li>
              ),
            )}
          </ul>

          <h3>Produtos Adicionais:</h3>
          <ul>
            {orcamentoSelecionado.produtosAdicionais.length > 0 ? (
              orcamentoSelecionado.produtosAdicionais.map((prod, index) => (
                <li key={index}>
                  {prod.nome} - R$ {prod.valor} (+{prod.lucro}%)
                </li>
              ))
            ) : (
              <p>Nenhum produto adicional.</p>
            )}
          </ul>

          <h2>Total: R$ {orcamentoSelecionado.valorFinal.toFixed(2)}</h2>
          <button onClick={() => setOrcamentoSelecionado(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
