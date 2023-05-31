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
            const [post] = await db.query(
                'SELECT * FROM postagens ORDER BY dataCriacao DESC'
            );

            if (post) {
                return post; 
            } else {
                console.error('Erro. [user] ou [post] estão nulos');
            }

        } catch (err) {
            console.error('Erro na seleção de postagens: ',err);
        }
        
    }

    static async selecionarPostDoUsuario(id) {//Lê a tabela para retornar a postagem expecifica
        try {
            const [post] = await db.query(
                'SELECT * FROM postagens WHERE id = ? ORDER BY dataCriacao DESC',
                [id]
            );

            if (post) {
                return post[0]; 
            } else {
                console.error('Erro. [user] ou [post] estão nulos');
            }

        } catch (err) {
            console.error('Erro na seleção de postagens: ',err);
        }
        
    }
}
module.exports = Postagem;