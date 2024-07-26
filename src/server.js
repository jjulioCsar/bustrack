import 'dotenv/config';
import express from "express";

// Importação dos modelos e criação das tabelas
import "./models/linhaModel.js";
import "./models/motoristaModel.js";
import "./models/onibusModel.js"

// Importação das ROTAS
import linhaRoutes from "./routes/linhaRoutes.js";
import motoristaRoutes from "./routes/motoristaRoutes.js";
import onibusRoutes from "./routes/onibusRoutes.js";


const PORT = process.env.PORT || 3333; // Adicione um valor padrão para a porta

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Utilização das rotas
// http://localhost:3333/livros
app.use('/linha', linhaRoutes);

app.use('/motorista', motoristaRoutes )

app.use('/onibus', onibusRoutes)



app.listen(PORT, () => {
    console.log("Servidor on PORT " + PORT);
});
