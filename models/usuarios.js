const db = require('../config/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Usuario {
    constructor(email, senha, pNome, sNome, nick, dataNasc) {
        this.email = email;
        this.senha = senha;
        this.pNome = pNome;
        this.sNome = sNome;
        this.nick = nick;
        this.dataNasc = dataNasc;

    }

    static async procurarEmail(email) {//Procura o E-mail no banco
        try {
            console.log(email);
            //Os dados vem em 'rows' e os tipos de dados em 'fields'
            const [rows] = await db.query('SELECT email from usuarios where email = ?;', [email]);
            console.log(rows[0].email);
            return rows.length > 0 ? rows : null;

        } catch (err) {
            console.error('Erro na operação de verificar E-mail ' + err);

        }
    }

    static async cadastrar(email, senha, pNome, sNome, nick, dataNasc) {
        try {
            const chave = crypto.randomBytes(32).toString('hex'); //Chave aleatória
            const result = await db.query(
                'INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc, chave) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [email, senha, pNome, sNome, nick, dataNasc, chave]
            );
            return result

        } catch (err) {
            console.error('Erro na operação de cadastro no banco de dados ' + err);
            throw err;
        }
    }

    static async login(email, senha) {

        try {
            const rows = await this.procurarEmail(email);

            if (rows.length > 0) {

                console.log('Senha plana: ',senha, 'Senha em hash: ',rows.senha, 'Chave JWT: ',rows.chave); //Para depurar

                const auth = await bcrypt.compare(senha, rows.senha);
                if (auth) {

                    const payload = { //Conteúdo em Json que irá para o token
                        email: rows.email,  
                        pNome: rows.pNome, 
                        sNome: rows.sNome, 
                        nick: rows.nick, 
                        dataNasc: rows.dataNasc,
                    };

                    const token = jwt.sign(payload, rows.chave, {expiresIn: '12h'}); // Criação do token com data de expiração
                    return token;

                } else {
                    return false;
                }

            } else {
                return false
            }
            
        } catch (err) {
                console.error('Erro no método login ' + err);
        }
    }
}

module.exports = Usuario;