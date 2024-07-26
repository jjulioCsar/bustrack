import conn from "../config/conn.js";

export const puxarMotoristas = (req, res) => {
  const sql = `SELECT * FROM Motoristas`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Erro ao buscar Motoristas" });
      console.log(err);
      return;
    }
    res.status(200).json(data);
  });
};

export const cadastrarMotorista = (req, res) => {
  const { nome_motorista, cargo, data_nascimento, numero_habilitacao, salario } = req.body;

  // Validações
  if (!nome_motorista) return res.status(400).json({ msg: "O nome_motorista é obrigatório" });
  if (!data_nascimento) return res.status(400).json({ msg: "A data de contratação é obrigatória" });
  if (!numero_habilitacao) return res.status(400).json({ msg: "O numero_habilitacao é obrigatório" });

  // Verificar se o funcionário já existe
  const checkSql = `SELECT * FROM Motoristas WHERE nome_motorista = ? AND data_nascimento = ? AND numero_habilitacao = ?`;
  const checkValues = [nome_motorista, data_nascimento, numero_habilitacao];

  conn.query(checkSql, checkValues, (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Erro ao buscar o motorista" });
      console.log(err);
      return;
    }

    if (data.length > 0) {
      res
        .status(409)
        .json({ msg: "O motorista já existe no banco de dados" });
      return;
    }

    const id = 1
    const insertSQL = `INSERT INTO Motoristas (motorista_id, nome_motorista, data_nascimento, numero_habilitacao) VALUES (?, ?, ?, ?)`;
    const insertValues = [id, nome_motorista, data_nascimento, numero_habilitacao];

    conn.query(insertSQL, insertValues, (err) => {
      if (err) {
        res.status(500).json({ msg: "Erro ao cadastrar o motorista" });
        console.log(err);
        return;
      }
      res.status(200).json({ msg: "Motorista cadastrado com sucesso", id });
    });
  });
};

export const buscarMotorista = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM Motoristas WHERE motorista_id = ?`;
  conn.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar o motorista" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ msg: "Motorista não encontrado" });
      return;
    }

    res.status(200).json(data[0]);
  });
};

export const deletarMotorista = (req, res) => {
  const { id } = req.params;

  const deleteSql = `DELETE FROM Motoristas WHERE motorista_id = ?`;
  conn.query(deleteSql, [id], (err, info) => {
    if (err) {
      res.status(500).json({ msg: "Erro ao deletar o motorista" });
      return;
    }
    if (info.affectedRows === 0) {
      res.status(404).json({ msg: "Motorista não encontrado" });
      return;
    }
    res.status(200).json({ msg: "Motorista deletado com sucesso" });
  });
};
