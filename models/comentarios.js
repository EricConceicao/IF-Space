const db = require('../config/db');

class Comentarios {

    static async comentar (id, postId, comment) {
        try {
            
            const [comentario] = await db.query(
                'INSERT INTO comentarios(usuariosId, postagensId, comentario) VALUES(?, ?, ?);',
                [id, postId, comment]
            );

            if (comentario.affectedRows > 0) {
                return true
            } else {
                console.error('comentario retornou false:', comentario);
                return false
            }

        } catch (err) {
            console.error('Erro no método de comentar: ',err);
        }
    }

    static async listar (postId) {
        try {
            
            const [comentarios] = await db.query(
                `SELECT comentario, foto, nick FROM comentarios c
                INNER JOIN usuarios u ON c.usuariosId = u.id
                WHERE postagensId = ? ORDER BY data DESC;`,
                [postId]
            );

            return comentarios;
            
        } catch (err) {
            console.error('Erro no método de comentar: ',err);
        }
    }
}

module.exports = Comentarios;