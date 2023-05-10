const db = require('../config/db');

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
            //Faz uma conexão com o banco
            const connection = await db.getConnection();

            //Os dados vem em 'rows' e os tipos de dados em 'fields'
            const [rows, fields] = await db.query('SELECT email from usuarios where email = ?;', [this.email]);

            //"Desconecta/Libera a conexão"
            connection.release();

            /* Serve como uma condição. Se a query encontrar um email igual na consulta. rows sera maior que 0
               E então, ele retornará 'TRUE', e do contrário 'FALSE' */
            return rows.length > 0;
            
        } catch (err) {
            throw new Error(`Erro na operação de verificar E-mail. Erro: ${err}`);
            
        } finally {
            connection.release();
        }
    }

    async cadastrar() {
        try {
            const connection = await db.getConnection();

            const result = await db.query(
                'INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc) VALUES (?, SHA2(?, 256), ?, ?, ?, ?)', 
                [this.email, this.senha, this.pNome, this.sNome, this.nick, this.dataNasc]
            );
            connection.release();
            //Retorna o ID do usuário cadastrado
            return result.insertId;

        } catch (err) {
            throw new Error(`Erro na operação de cadastro no banco de dados: ${err}`);

        } finally {
            connection.release();
        }
    }
}

module.exports = Usuario;