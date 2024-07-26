import conn from "../config/conn.js";

export const puxarLinhas = (req, res) => {
    const sql = `SELECT * FROM Linhas`;

    conn.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ msg: "Erro ao buscar linhas" });
            console.log(err);
            return;
        }
        res.status(200).json(data);
    });
};

export const cadastrarLinha = (req, res) => {
    const { nome_linha, numero_linha, itinerario } = req.body;

    
    if (!nome_linha) return res.status(400).json({ msg: "O nome_linha da linha é obrigatório" });
    if (!numero_linha) return res.status(400).json({ msg: "O numero da linha é obrigatório" });
    if (!itinerario) return res.status(400).json({ msg: "O itinerario é obrigatório" });


    const checkSql = `SELECT * FROM Linhas WHERE nome_linha = ? AND numero_linha = ? AND itinerario = ?`;
    const checkValues = [nome_linha, numero_linha, itinerario];

    conn.query(checkSql, checkValues, (err, data) => {
        if (err) {
            res.status(500).json({ msg: "Erro ao buscar a linha" });
            console.log(err);
            return;
        }

        if (data.length > 0) {
            res.status(409).json({ msg: "A linha já existe no banco de dados" });
            return;
        }

        const id = 1
        const insertSQL = `INSERT INTO Linhas (linha_id, nome_linha, numero_linha, itinerario) VALUES (?, ?, ?, ?)`;
        const insertValues = [id, nome_linha, numero_linha, itinerario];

        conn.query(insertSQL, insertValues, (err) => {
            if (err) {
                res.status(500).json({ msg: "Erro ao cadastrar a linha do onibus" });
                console.log(err);
                return;
            }
            res.status(200).json({ msg: "Linha cadastrada com sucesso", id });
        });
    });
};

export const buscarLinha = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM Linhas WHERE linha_id = ?`;
    conn.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: "Erro ao buscar a linha" });
            return;
        }

        if (data.length === 0) {
            res.status(404).json({ msg: "Linha não encontrada" });
            return;
        }

        res.status(200).json(data[0]);
    });
};

export const editarLinha = (req, res) => {
    const { id } = req.params;
    const { nome_linha, numero_linha, itinerario} = req.body;

  
    if (!nome_linha) return res.status(400).json({ msg: "O nome da linha é obrigatório" });
    if (!numero_linha) return res.status(400).json({ msg: "O numero da linha é obrigatório" });
    if (!itinerario) return res.status(400).json({ msg: "O itinerario é obrigatório" });
    

    const checkSql = `SELECT * FROM Linhas WHERE linha_id = ?`;
    conn.query(checkSql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao buscar linha" });
        }

        if (data.length === 0) {
            return res.status(404).json({ msg: "Linha não encontrada" });
        }

       
        const updateSql = `UPDATE Linhas SET nome_linha = ?, numero_linha = ?, itinerario = ? WHERE linha_id = ?`;
        const updateValues = [nome_linha, numero_linha, itinerario, id];

        conn.query(updateSql, updateValues, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Erro ao atualizar linha" });
            }
            res.status(200).json({ msg: "Linha atualizada com sucesso" });
        });
    });
};
