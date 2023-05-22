const db = require('../config/db');

class Postagem {
    constructor (id, userId, titulo, texto, anexo, likes) {
        this.id = id;
        this.userId = userId;
        this.titulo = titulo;
        this.texto = texto;
        this.anexo = anexo;
        this.likes = likes;
    }

    async postar() {
        //Cria uma postagem nova na tabela
    }

    async editar () {
        //Edita um entrada de uma determinada postagem na tabela
    }

    async exibirNoFeed() {
        //Lê a tabela para retornar as postagens para o feed
    }
}