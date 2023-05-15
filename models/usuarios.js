const db = require('../config/db');

class Usuario {
    constructor(email, senha, pNome, sNome, nick, dataNasc) {
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
            throw new Error('Erro na operação de verificar E-mail. Erro:' + err);

        }
    }

    async cadastrar() {
        try {
            const result = await db.query(
                'INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc) VALUES (?, ?, ?, ?, ?, ?)',
                [this.email, this.senha, this.pNome, this.sNome, this.nick, this.dataNasc]
            );

            return result

        } catch (err) {
            console.error('Erro na operação de cadastro no banco de dados: ' + err);

        }
    }

    static async login(email, senha) {

        try {
            const [rows] = await db.query(
                'SELECT * FROM usuarios WHERE email = ?', [email]
            );

            if (rows.length > 0) {
                //Dados do banco para comparação
                let authEmail = rows[0].email;
                let authSenha = rows[0].senha;
                console.log('E-mail: ',email, 'A E-mail: ',authEmail, 'Senha: ',senha, 'A Senha: ',authSenha)
                if (authEmail === email && authSenha === senha) {
                    return rows[0];

                } else {
                    return false;
                }
            } else {
                return false
            }
            
        } catch (err) {
                console.error('Erro no método login: ' + err);
        }
    }
}

module.exports = Usuario;