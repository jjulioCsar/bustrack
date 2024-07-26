import conn from "../config/conn.js";

const tableMotorista = /*sql*/ `
    CREATE TABLE IF NOT EXISTS Motoristas (
    motorista_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_motorista VARCHAR(60) NOT NULL,
    data_nascimento DATE NOT NULL,
    numero_habilitacao VARCHAR(9) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

conn.query(tableMotorista, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela: " + err.stack);
        return;
    }
    
    console.log("Tabela [Motoristas] criada com sucesso!");
});
