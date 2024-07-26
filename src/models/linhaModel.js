import conn from "../config/conn.js";

const tableLinha = /*sql*/ `
CREATE TABLE IF NOT EXISTS Linhas (
    linha_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_linha VARCHAR(60) NOT NULL,
    numero_linha VARCHAR(10) NOT NULL,  -- Ajustado o tamanho para 10, ajuste conforme necessário
    itinerario VARCHAR(255) NOT NULL,  -- Pode ajustar para TEXT se necessário
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

conn.query(tableLinha, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela: " + err.stack);
        return;
    }
    
    console.log("Tabela [Linhas] criada com sucesso!");
});
