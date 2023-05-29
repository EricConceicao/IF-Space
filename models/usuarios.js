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

    static async procurarEmail(email) {// Procura o E-mail no banco
        try {
            // Os dados vem em 'rows' e os tipos de dados em 'fields'
            const [rows] = await db.query('SELECT * from usuarios where email = ?;', [email]);
            return rows.length > 0 ? rows[0] : null;

        } catch (err) {
            console.error('Erro na operação de verificar E-mail ' + err);

        }
    }

    static async chaveiro(id) {// Procura a chave para o token no banco
        try {
            
            const [rows] = await db.query('SELECT chave from usuarios where id = ?;', [id]);
            return rows.length > 0 ? rows[0].chave : null;

        } catch (err) {
            console.error('Erro na operação de pegar a chave ' + err);

        }
    }

    static async buscarNome(id) {// Procura o nome ou apelido para exibir no post
        try {
            
            const [rows] = await db.query('SELECT pNome, sNome, nick from usuarios where id = ?;', [id]);
            console.log(rows[0]);
            return rows.length > 0 ? rows[0] : null;

        } catch (err) {
            console.error('Erro na operação de pegar o nome e apelido ' + err);

        }
    }

    static async concatName(pNome, sNome) { // Concatena o nome para usar como um nick provisório
        return pNome + ' ' + sNome;
    }

    static async cadastrar(email, senha, pNome, sNome, nick, dataNasc) {
        try {
            const chave = crypto.randomBytes(32).toString('hex'); // Chave aleatória
            
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
            if (rows) {

                const auth = await bcrypt.compare(senha, rows.senha);
                if (auth) {

                    const payload = { // Conteúdo em Json que irá para o token
                        id: rows.id,
                        email: rows.email,  
                        pNome: rows.pNome, 
                        sNome: rows.sNome, 
                        nick: rows.nick, 
                        dataNasc: rows.dataNasc,
                    };
                    const token = jwt.sign(payload, rows.chave, {expiresIn: '12h'}); // Criação do token com data de expiração
                    const id = rows.id;
                    const values = {token, id}
                    
                    return values;

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