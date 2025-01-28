-- Criação da tabela "orcamentos"
CREATE TABLE orcamentos (
    id BIGSERIAL PRIMARY KEY,            -- Identificador único do orçamento
    componentes JSONB NOT NULL,          -- Dados dos componentes principais
    produtos_adicionais JSONB NOT NULL,  -- Dados dos produtos adicionais
    valor_final NUMERIC(10, 2) NOT NULL, -- Valor final do orçamento
    data_criacao TIMESTAMP DEFAULT NOW() -- Data de criação do orçamento
);
