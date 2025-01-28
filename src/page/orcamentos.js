import React, { useState } from "react";
import PercentageSelector from "./percentSelector";
import ProdutosAdicionais from "./produtosAdicionais";
import "./orcamentos.css";

export default function Orcamentos() {
  const [processadorModelo, setProcessadorModel] = useState('');
  const [processadorCusto, setProcessadorCusto] = useState(0)
  const [processadorPercent, setProcessadorPercent] = useState(0);
  const [placaMaeModelo, setPlacaMaeModelo] = useState('');
  const [placaMaeCusto, setPlacaMaeCusto] = useState(0);
  const [placaMaePercent, setPlacaMaePercent] = useState(0);
  const [memoriaRamModelo, setMemoriaRamModelo] = useState('');
  const [memoriaRamCusto, setMemoriaRamCusto] = useState(0);
  const [memoriaramPercent, setMemoriaramPercent] = useState(0);
  const [armazenamentoNome, setArmazenamentoNome] = useState('');
  const [armazenamentoCusto, setArmazenamentoCusto] = useState(0);
  const [armazenamentoPercent, setArmazenamentoPercent] = useState(0);
  const [gabineteNome, setGabineteNome] = useState('');
  const [gabineteCusto, setGabineteCusto] = useState(0);
  const [gabinetePercent, setGabinetePercent] = useState(0);
  const [produtosAdicionais, setProdutosAdicionais] = useState([]);
  const [valorFinal, setValorFinal] = useState(0);

  const adicionarProduto = () => {
    setProdutosAdicionais((prev) => [
      ...prev,
      { nome: "", valor: "", lucro: "" }
    ]);
  };

  const atualizarProduto = (index, field, value) => {
    const novosProdutos = [...produtosAdicionais];
    novosProdutos[index][field] = value;
    setProdutosAdicionais(novosProdutos);
  };



  return (
    <div className="orcamentos">
      <form>
        <title>Orçamentos</title>
        <h1>Gerar Orçamentos</h1>
        <label>
          Processador:
          <input
            name="processadorNomee"
            type="text"
            placeholder="Insira aqui o modelo da CPU"
            value={processadorModelo}
            onChange={(e) => setProcessadorModel(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor de Custo: "
            value={processadorCusto}
            onChange={(e) => setProcessadorCusto(parseFloat(e.target.value) || 0)}
          />
          <PercentageSelector
            label="Lucro sobre o Processador:"
            value={processadorPercent} onChange={setProcessadorPercent}
          />
        </label>

        <label>
          Placa Mãe:
          <input type="text" placeholder="Insira aqui o modelo da placa mãe: "
            value={placaMaeModelo} onChange={(e) => setPlacaMaeModelo(parseFloat(e.target.value))} />
          <input type="number" placeholder="Insira aqui o custo da placa mãe: "
            value={placaMaeCusto} onChange={(e) => setPlacaMaeCusto(parseFloat(e.target.value))} />
          <PercentageSelector
            label="Lucro sobre a Placa Mãe:"
            value={placaMaePercent}
            onChange={setPlacaMaePercent}
          />
        </label>
        <label>
          Memória Ram:
          <input type="text" placeholder="Insira aqui o modelo da memória ram: "
            value={memoriaRamModelo} onChange={(e) => setMemoriaRamModelo(parseFloat(e.target.value))} />
          <input type="number" placeholder="Insira aqui o custo da memória ram: "
            value={memoriaRamCusto} onChange={(e) => setMemoriaRamCusto(parseFloat(e.target.value))} />
          <PercentageSelector
            label="Lucro sobre a memória ram:"
            value={memoriaramPercent}
            onChange={setMemoriaramPercent}
          />
        </label>
        <label>
          Gabinete:
          <input type="text" placeholder="Insira aqui o modelo do gabinete: "
            value={gabineteNome} onChange={(e) => setGabineteNome(parseFloat(e.target.value))} />
          <input type="number" placeholder="Insira aqui o custo do gabinete: "
            value={gabineteCusto} onChange={(e) => setGabineteCusto(parseFloat(e.target.value))} />
          <PercentageSelector
            label="Lucro sobre o Gabinete: "
            value={gabinetePercent}
            onChange={setGabinetePercent}
          />
        </label>
        <label>
          Armazenamento:
          <input type="text" placeholder="Insira aqui o modelo do SSD/HD: "
            value={armazenamentoNome} onChange={(e) => setArmazenamentoNome(parseFloat(e.target.value))} />
          <input type="number" placeholder="Insira aqui o custo do SSD/HD: "
            value={armazenamentoCusto} onChange={(e) => setArmazenamentoCusto(parseFloat(e.target.value))} />
          <PercentageSelector
            label="Lucro sobre o Armazenamento: "
            value={armazenamentoPercent}
            onChange={setArmazenamentoPercent}
          />
        </label>

        {/* Produtos Adicionais */}
        <ProdutosAdicionais
          produtos={produtosAdicionais}
          onAdicionar={adicionarProduto}
          onAtualizar={atualizarProduto}
        />
      </form>
    </div>
  );
}
