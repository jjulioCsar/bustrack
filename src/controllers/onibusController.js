import conn from "../config/conn.js";

export const puxarOnibus = (req, res) => {
  const sql = `SELECT * FROM Onibus`;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ msg: "Erro ao buscar Onibus" });
      console.log(err);
      return;
    }
    res.status(200).json(data);
  });
};

export const cadastrarOnibus = (req, res) => {
    const { linha_id, motorista_id, placa, modelo} = req.body;
  
    // Validações
    if (!linha_id) return res.status(400).json({ msg: "O id da linha é obrigatório" });
    if (!motorista_id) return res.status(400).json({ msg: "O id do motorista é obrigatório" });
    if (!placa) return res.status(400).json({ msg: "A placa é obrigatória" });
    if (!modelo) return res.status(400).json({ msg: "O modelo é obrigatório" });
    if (!ano_fabricacao) return res.status(400).json({ msg: "O ano de fabricacao é obrigatório" });
    if (!capacidade) return res.status(400).json({ msg: "A capacidade é obrigatório" });
  
    // Verificar se o Onibus já existe
    const checkSql = `SELECT * FROM Onibus WHERE linha_id = ? AND motorista_id = ? AND placa = ? AND modelo = ?`;
    const checkValues = [linha_id, motorista_id, placa, modelo];
  
    conn.query(checkSql, checkValues, (err, data) => {
      if (err) {
        res.status(500).json({ msg: "Erro ao buscar o onibus" });
        console.log(err);
        return;
      }
  
      if (data.length > 0) {
        res
          .status(409)
          .json({ msg: "O onibus já existe no banco de dados" });
        return;
      }
  
      const id = uuidv4();
      const insertSQL = `INSERT INTO Onibus (onibus_id, linha_id, motorista_id, placa, modelo, ano_fabricacao) VALUES (?, ?, ?, ?, ?, ?)`;
      const insertValues = [id, linha_id, motorista_id, placa, modelo, ano_fabricacao];
  
      conn.query(insertSQL, insertValues, (err) => {
        if (err) {
          res.status(500).json({ msg: "Erro ao cadastrar o onibus" });
          console.log(err);
          return;
        }
        res.status(200).json({ msg: "Onibus cadastrado com sucesso", id });
      });
    });
};

export const buscarOnibus = (req, res) => {
    const { id } = req.params;
  
    const sql = `SELECT * FROM Onibus WHERE onibus_id = ?`;
    conn.query(sql, [id], (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro ao buscar o onibus" });
        return;
      }
  
      if (data.length === 0) {
        res.status(404).json({ msg: "Onibus não encontrado" });
        return;
      }
  
      res.status(200).json(data[0]);
    });
};