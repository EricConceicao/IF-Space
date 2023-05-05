const pool = require('../config/db');

class Usuario {
    constructor (email, senha, pNome, sNome, nick, dataNasc){
        this.email = email;
        this.senha = senha;
        this.pNome = pNome;
        this.sNome = sNome;
        this.nick = nick;
        this.dataNasc = dataNasc;
        
    }

    async verificarEmail() {
        try {
            //Os dados vem em 'rows' e os tipos de dados em 'fields'
            const [rows, fields] = await pool.query('SELECT email from usuarios where email = ?;', [this.email]);
            /* Serve como uma condição. Se a query encontrar um email igual na consulta. rows sera maior que 0
               E então, ele retornará 'TRUE', e do contrário 'FALSE' */
            return rows.length > 0;
            
        } catch (err) {
            console.error(`Erro na operação de verificar E-mail. Erro: ${err}`);
        }
    }

    async cadastrar() {
        try {
            const result = await pool.query(
                'INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc) VALUES (?, SHA2(?, 256), ?, ?, ?, ?)', 
                [this.email, this.senha, this.pNome, this.sNome, this.nick, this.dataNasc]
            );
            if (result.affectedRows > 0) {
            //Retorna o ID do usuário cadastrado
            return result.insertId;

            } else {
                console.error(`Erro ao fazer cadastro no banco de dados`);
            }

        } catch (err) {
            console.error(`Erro na operação de cadastro no banco de dados: ${err}`);
        }
    }
}

module.exports = Usuario;