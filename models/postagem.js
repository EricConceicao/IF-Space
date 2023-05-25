const db = require('../config/db');

class Postagem {
    constructor (userId, titulo, texto, anexo, likes) {
        this.userId = userId;
        this.titulo = titulo;
        this.texto = texto;
        this.anexo = anexo;
        this.likes = likes;
    }

    async postar(userId, titulo, texto, anexo) {//Cria uma nova postagem na tabela
        const result = db.query(
            'INSERT INTO postagens (userId, titulo, texto, anexo, likes) VALUES (?, ?, ?, ?)',
            [userId, titulo, texto, anexo]
        );

        if (result) {
            return result[0];
        }
        
    }

    async editar () {
        //Edita um entrada de uma determinada postagem na tabela
    }

    async exibirNoFeed() {
        //Lê a tabela para retornar as postagens para o feed
    }
}