const db = require('../config/db');
const Usuario = require('./usuarios');

class Postagem {
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

            if (rows) {
                return rows; 
            } else {
                console.error('Erro ao retornar posts ' + rows);
            }

        } catch (err) {
            console.error('Erro na seleção de postagens: ',err);
        }
        
    }

    static async selecionarPostExpecifico(id) {//Lê as tabelas para retornar a postagem expecifica e a foto
        try {
            const [post] = await db.query(
                'SELECT p.*, u.foto, u.banner FROM postagens p INNER JOIN usuarios u ON p.usuariosId = u.id WHERE p.Id = ?',
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

    static async selecionarPostsDoUsuario(id) {//Lê as tabelas para retornar as postagens e a foto
        try {
            const [post] = await db.query(
                'SELECT p.*, u.foto FROM postagens p INNER JOIN usuarios u ON usuariosId = u.id WHERE usuariosId = ? ORDER BY dataCriacao desc',
                [id]
            );
            
            return post; 

        } catch (err) {
            console.error('Erro no método de selecionar posts do usuário: ',err);
        }
        
    }
}

module.exports = Postagem;