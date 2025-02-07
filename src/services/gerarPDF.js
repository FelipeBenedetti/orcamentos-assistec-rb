import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPDF from "./BudgetPDF";
import supabase from "../external/supabaseconfig";

const BudgetPage = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from("orcamentos") // Substitua pelo nome correto da sua tabela
        .select("id, cliente, produtos") // Certifique-se de que os campos existem
        .order("id", { ascending: false }) // Pega o último orçamento gerado
        .limit(1)
        .single();

      if (error) {
        console.error("Erro ao buscar orçamento:", error);
      } else {
        setBudgetData(data);
      }
      setLoading(false);
    };

    fetchBudget();
  }, []);

  return (
    <div>
      <h2>Gerar Orçamento</h2>
      {loading ? (
        <p>Carregando orçamento...</p>
      ) : budgetData ? (
        <PDFDownloadLink
          document={
            <BudgetPDF
              clientName={budgetData.cliente}
              products={budgetData.produtos}
            />
          }
          fileName={`orcamento_${budgetData.id}.pdf`}
        >
          {({ loading }) => (loading ? "Gerando PDF..." : "Baixar PDF")}
        </PDFDownloadLink>
      ) : (
        <p>Nenhum orçamento encontrado.</p>
      )}
    </div>
  );
};

export default BudgetPage;
