const db = require('../config/db');
const Usuario = require('./usuarios');

class Postagem {
    constructor (userId, titulo, texto, anexo, likes) {
        this.userId = userId;
        this.titulo = titulo;
        this.texto = texto;
        this.anexo = anexo;
        this.likes = likes;
    }

    static async postar (userId, titulo, texto, autor, anexos) {//Cria uma nova postagem na tabela
        try {
            const result = await db.query(
                'INSERT INTO postagens (usuariosId, titulo, texto, autor, anexos) VALUES (?, ?, ?, ?, ?)',
                [userId, titulo, texto, autor, anexos]
            );

            if (result) {
                return result;
            };
        } catch (err) {
            console.error('Erro na inserção da postagem: ',err);
        }
        
        
    }

    async editar () {
        //Edita uma entrada de uma determinada postagem na tabela
    }

    static async selecionarPosts() {//Lê a tabela para retornar as postagens para o feed
        try {
            const [rows] = await db.query(
                'SELECT p.*, u.foto FROM postagens p INNER JOIN usuarios u ON p.usuariosId = u.id ORDER BY p.dataCriacao DESC'
            );

            if (rows.length > 0) {
                return rows; 
            } else {
                console.error('Erro ' + rows);
            }

        } catch (err) {
            console.error('Erro na seleção de postagens: ',err);
        }
        
    }

    static async selecionarPostDoUsuario(id) {//Lê a tabela para retornar a postagem expecifica
        try {
            const [post] = await db.query(
                'SELECT p.*, u.foto FROM postagens p INNER JOIN usuarios u ON p.usuariosId = u.id WHERE p.Id = ?',
                [id]
            );
            
            if (post.length > 0) {
                return post[0]; 
            } else {
                console.error('Erro. post retornou nulo: ' + post[0]);
                return false;
            }

        } catch (err) {
            console.error('Erro na seleção de postagens: ',err);
        }
        
    }
}
module.exports = Postagem;