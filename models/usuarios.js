const db = require('../config/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

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

    static async compararSenha(senha, hashSenha) {// Compara a senha no banco, com a senha inserida
        return bcrypt.compare(senha, hashSenha);
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
            return rows.length > 0 ? rows[0] : null;

        } catch (err) {
            console.error('Erro na operação de pegar o nome e apelido ' + err);

        }
    }

    static async concatName(pNome, sNome) { // Concatena o nome para usar como um nick provisório caso omitido no cadastro
        return pNome + ' ' + sNome;
    }

    static async token(user, req, res) { // Método de criação do token ou atualização
        try {
            const id = user.id;
            const payload = { // Conteúdo em Json que irá para o token
                id: user.id,
                email: user.email,
                pNome: user.pNome,
                sNome: user.sNome,
                nick: user.nick,
                foto: user.foto,
                dataNasc: user.dataNasc,
            };

            // Ele ainda recebe os dados que estão localmente, sem procurar mais.

            if (!user.chave) {
                user.chave = await this.chaveiro(id); 
            }

            const token = jwt.sign(payload, user.chave, { expiresIn: '1h' }); // Criação do token com data de expiração     
            
            const values = { token, id }

            if (req.cookies.Auth) {
                res.clearCookie('Auth');
            }
            
            const tokenString = JSON.stringify(values);
            res.cookie('Auth', tokenString, { maxAge: 1000 * 60 * 60 });

            return { result: true};
        }
        catch (err) {
            console.error('Erro no método de geração de token. ')
        }
    }

    static async cadastrar(email, senha, pNome, sNome, nick, dataNasc) {
        try {
            const chave = crypto.randomBytes(32).toString('hex'); // Chave aleatória

            const result = await db.query(
                'INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc, chave) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [email, senha, pNome, sNome, nick, dataNasc, chave]
            );

            return result;

        } catch (err) {
            console.error('Erro na operação de cadastro no banco de dados ' + err);
            throw err;
        }
    }

    static async login(email, senha, req, res) {
        try {
            const user = await this.procurarEmail(email);
            if (user) {

                const auth = await this.compararSenha(senha, user.senha);

                if (auth) {
                    const result = await this.token(user, req, res); 
                    return result

                } else {
                    return { result: false, erro: 'Senha incorreta.' };;
                }

            } else {
                return { result: false, erro: 'E-mail não encontrado.' };
            }

        } catch (err) {
            console.error('Erro no método login ' + err);
        }
    }

    static async editarDados(query, params, req, res, nick) {
        try {
            const [update] = await db.query(query, params);

            if (nick) {
                const nickNoPost = await db.query(
                    `UPDATE postagens SET
                    autor = ?
                    WHERE usuariosId = ?;`,
                    [nick, req.usuario.id]
                )
                
                if (nickNoPost) {
                    req.usuario.nick = nick; // Isso vai atualizar o nick do usuário no token com o novo
                    const atualizarToken = await Usuario.token(req.usuario, req, res);
                }

                return true
            } else {
                return true
            }

        } catch (err) {
            console.error('Erro no método de editar dados' + err);
        }
    }

    static async mudarFoto(caminho, id, req, res) {
        try {
            const result = await db.query(
                'UPDATE usuarios SET foto = ? WHERE id = ?' ,
                [caminho, id]
            );

            const token = await this.token(req.usuario, req, res);
                
            return true

        } catch (err) {
            console.error('Erro no método de mudar a foto ' + err);
        }
    }

    static async seguir(seguidor, seguido) {
        try {
            const result = await db.query('INSERT INTO seguir (seguidorId, seguidoId) VALUES (?, ?)', [seguidor, seguido]);

            if (result) {
                console.log(result);
                return true
            } else {
                console.error('Erro. Result retornou inesperadamente ' + result);
                return false
            }

        } catch (err) {
            console.error('Erro no método de seguir ' + err);
        }
    }
}
module.exports = Usuario;