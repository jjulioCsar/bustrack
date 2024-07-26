import conn from "../config/conn.js";


export const getAllBusData = (req, res) => {
  const query = `
    SELECT 
      onibus.placa AS placa_onibus, 
      onibus.modelo AS modelo_onibus, 
      onibus.ano_fabricacao AS ano_fabricacao_onibus, 
      onibus.capacidade AS capacidade_onibus,
      linha.nome_linha AS nome_linha,
      linha.numero_linha AS numero_linha,
      linha.itinerario AS itinerario_linha,
      motorista.nome_motorista AS nome_motorista,
      motorista.data_nascimento AS data_nascimento_motorista,
      motorista.numero_habilitacao AS numero_carteira_motorista
    FROM Onibus AS onibus
    INNER JOIN Linhas AS linha ON onibus.linha_id = linha.linha_id
    INNER JOIN Motoristas AS motorista ON onibus.motorista_id = motorista.motorista_id
  `;
  
  try {
    conn.query(query, (error, results) => {
      if (error) {
        console.error("Erro ao consultar os dados dos ônibus:", error);
        return res.status(500).json({ message: "Erro ao tentar solicitar dados!" });
      }

      
      const formattedResults = results.map((result) => ({
        placa: result.placa_onibus,
        modelo: result.modelo_onibus,
        ano_fabricacao: result.ano_fabricacao_onibus,
        capacidade: result.capacidade_onibus,
        linha: {
          nome_linha: result.nome_linha,
          numero_linha: result.numero_linha,
          itinerario: result.itinerario_linha,
        },
        motorista: {
          nome: result.nome_motorista,
          data_nascimento: result.data_nascimento_motorista,
          numero_carteira_habilitacao: result.numero_carteira_motorista,
        },
      }));

      res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error("Erro ao tentar solicitar dados:", error);
    res.status(500).json({ message: "Erro ao tentar solicitar dados mais embaixo!" });
  }
};


export const puxarOnibus = (req, res) => {
  const sql = `SELECT * FROM Onibus`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error("Erro ao buscar ônibus:", err);
      res.status(500).json({ msg: "Erro ao buscar ônibus" });
      return;
    }
    res.status(200).json(data);
  });
};


export const cadastrarOnibus = (req, res) => {
  const { linha_id, motorista_id, placa, modelo, ano_fabricacao, capacidade } = req.body;

  if (!linha_id) return res.status(400).json({ msg: "O id da linha é obrigatório" });
  if (!motorista_id) return res.status(400).json({ msg: "O id do motorista é obrigatório" });
  if (!placa) return res.status(400).json({ msg: "A placa é obrigatória" });
  if (!modelo) return res.status(400).json({ msg: "O modelo é obrigatório" });
  if (!ano_fabricacao) return res.status(400).json({ msg: "O ano de fabricação é obrigatório" });
  if (!capacidade) return res.status(400).json({ msg: "A capacidade é obrigatória" });


  const checkSql = `SELECT * FROM Onibus WHERE linha_id = ? AND motorista_id = ? AND placa = ?`;
  const checkValues = [linha_id, motorista_id, placa];

  conn.query(checkSql, checkValues, (err, data) => {
    if (err) {
      console.error("Erro ao verificar se o ônibus já existe:", err);
      res.status(500).json({ msg: "Erro ao buscar o ônibus" });
      return;
    }

    if (data.length > 0) {
      res.status(409).json({ msg: "O ônibus já existe no banco de dados" });
      return;
    }

    const insertSQL = `INSERT INTO Onibus (linha_id, motorista_id, placa, modelo, ano_fabricacao, capacidade) VALUES (?, ?, ?, ?, ?, ?)`;
    const insertValues = [linha_id, motorista_id, placa, modelo, ano_fabricacao, capacidade];

    conn.query(insertSQL, insertValues, (err) => {
      if (err) {
        console.error("Erro ao cadastrar o ônibus:", err);
        res.status(500).json({ msg: "Erro ao cadastrar o ônibus" });
        return;
      }
      res.status(201).json({ msg: "Ônibus cadastrado com sucesso!" });
    });
  });
};


export const buscarOnibus = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM Onibus WHERE onibus_id = ?`;
  conn.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Erro ao buscar o ônibus:", err);
      res.status(500).json({ msg: "Erro ao buscar o ônibus" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ msg: "Ônibus não encontrado" });
      return;
    }

    res.status(200).json(data[0]);
  });
};
