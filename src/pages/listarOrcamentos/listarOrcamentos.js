import React, { useEffect, useState } from "react";
import supabase from "../../external/supabaseconfig";

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
        console.log("Orçamentos carregados do Supabase:", data);
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
            <strong>ID:</strong> {orcamento.id} <strong>Cliente:</strong>{" "}
            {orcamento.cliente}
            <strong>Valor Final:</strong> R${" "}
            {orcamento.valor_final?.toFixed(2) || "0.00"}
            <button
              onClick={() => {
                console.log("Orçamento selecionado:", orcamento);
                setOrcamentoSelecionado(orcamento);
              }}
            >
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
            {orcamentoSelecionado.data_criacao
              ? new Date(orcamentoSelecionado.data_criacao).toLocaleDateString()
              : "Data não disponível"}
          </p>

          {console.log("Orçamento selecionado ao abrir:", orcamentoSelecionado)}

          <h3>Componentes:</h3>
          <ul>
            {orcamentoSelecionado.componentes ? (
              Object.entries(orcamentoSelecionado.componentes).map(
                ([key, comp]) => (
                  <li key={key}>
                    <strong>{key}:</strong>{" "}
                    {comp?.modelo || "Modelo desconhecido"} - R$
                    {comp?.custo ? comp.custo.toFixed(2) : "0.00"} (+
                    {comp?.percent || 0}%)
                  </li>
                ),
              )
            ) : (
              <p>Nenhum componente encontrado.</p>
            )}
          </ul>

          <h3>Produtos Adicionais:</h3>
          <ul>
            {Array.isArray(orcamentoSelecionado.produtos_adicionais) &&
            orcamentoSelecionado.produtos_adicionais.length > 0 ? (
              orcamentoSelecionado.produtos_adicionais.map((prod, index) => (
                <li key={index}>
                  {prod?.nome || "Nome desconhecido"} - R${" "}
                  {prod?.valor || "0.00"} (+{prod?.lucro || 0}%)
                </li>
              ))
            ) : (
              <p>Nenhum produto adicional.</p>
            )}
          </ul>

          <h2>
            Total: R$ {orcamentoSelecionado.valor_final?.toFixed(2) || "0.00"}
          </h2>
          <button onClick={() => setOrcamentoSelecionado(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
