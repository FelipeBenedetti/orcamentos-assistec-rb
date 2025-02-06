import React from "react";

function PercentageSelector({ label, value, onChange }) {
  const handleInputChange = (e) => {
    // Garante que o valor inserido seja numérico e entre 0 e 100
    const numericValue = Math.max(0, Math.min(100, Number(e.target.value)));
    onChange(numericValue);
  };

  const handleDropdownChange = (e) => {
    onChange(Number(e.target.value)); // Atualiza com o valor do dropdown
  };

  return (
    <label>
      {label}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Dropdown */}
        <select value={value} onChange={handleDropdownChange}>
          <option value="">Selecione...</option>
          <option value="10">0%</option>
          <option value="10">10%</option>
          <option value="10">15%</option>
          <option value="20">20%</option>
          <option value="20">25%</option>
          <option value="30">30%</option>
          <option value="30">35%</option>
          <option value="40">40%</option>
          <option value="40">45%</option>
          <option value="50">50%</option>
          <option value="50">55%</option>
          <option value="60">60%</option>
          <option value="60">65%</option>
          <option value="70">70%</option>
          <option value="70">75%</option>
          <option value="80">80%</option>
          <option value="80">85%</option>
          <option value="90">90%</option>
          <option value="90">95%</option>
          <option value="100">100%</option>
        </select>

        {/* Input Manual */}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="Insira o valor"
          min="0"
          max="100"
        />
        <span>%</span>
      </div>
    </label>
  );
}

export default PercentageSelector;
