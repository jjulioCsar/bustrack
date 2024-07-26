import conn from "../config/conn.js";

const tableLinha = /*sql*/ `
create table if not exists Linhas(
linha_id int auto_increment primary key,
nome_linha varchar(60) not null,
numero_linha varchar(60) not null,
itinerario varchar(255) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
)
`;

conn.query(tableLinha, (err) =>{
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
        return
    }
    
    console.log("Tabela [Linhas] criada com sucesso!")
})
