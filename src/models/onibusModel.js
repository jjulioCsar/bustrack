import conn from "../config/conn.js";

const tableOnibus = /*sql*/ `
CREATE TABLE IF NOT EXISTS Onibus (
    onibus_id INT AUTO_INCREMENT PRIMARY KEY,
    linha_id INT NOT NULL,
    motorista_id INT NOT NULL,
    placa VARCHAR(8) NOT NULL,
    modelo VARCHAR(60) NOT NULL,
    ano_fabricacao YEAR NOT NULL,
    capacidade VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (linha_id) REFERENCES Linhas(linha_id),
    foreign key (motorista_id) references Motoristas(motorista_id)
);
`;

conn.query(tableOnibus, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela: " + err.stack);
        return;
    }
    
    console.log("Tabela [Onibus] criada com sucesso!");
});
