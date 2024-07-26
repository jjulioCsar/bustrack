import conn from "../config/conn.js";

const tableMotorista = /*sql*/ `
create table if not exists Motoristas(
motorista_id int auto_increment primary key,
nome_motorista varchar(60) not null,
data_nascimento date not null,
numero_habilitacao varchar(9) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
)
`;

conn.query(tableMotorista, (err) =>{
    if(err){
        console.error("Erro ao criar a tabela"+err.stack)
        return
    }
    
    console.log("Tabela [Motoristas] criada com sucesso!")
})
