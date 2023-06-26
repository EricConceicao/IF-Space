const db = require('../config/db');

class Seguir {

    static async checarId(seguidor, seguido) { // Checa se o usuário já segue ou não determinado usuário
        try {
            const [result] = await db.query('SELECT * FROM seguir WHERE seguidorId = ? AND seguidoId = ?', 
            [seguidor, seguido]);

            if (result.length > 0) {
                return result[0];

            } else {
                return false
            }

        } catch (err) {
            console.error('Erro no método de checagem de seguidor: ' + err);
        }
    }

    static async seguirId(seguidor, seguido, opcao) { // Faz usuário A seguir usuário B
        try {
            let query;
            const status = 'seguindo'
            const params = [seguidor, seguido];

            if (opcao) {
                query = 'UPDATE seguir SET status = ? WHERE seguidorId = ? AND seguidoId = ?;'
                params.unshift(status);
            } else {
                query = 'INSERT INTO seguir (seguidorId, seguidoId) VALUES (?, ?)'
            }

            const [result] = await db.query(query, params);

            if (result.affectedRows > 0) {
                return true
            } else {
                console.error('Erro. Result retornou de forma inesperada ' + result);
                return false
            }

        } catch (err) {
            console.error('Erro no método de seguir ' + err);
        }
    }

    static async pararDeSeguir(seguidor, seguido) { // Faz o usuário deixar de seguir outro
        try {
            const status = 'parou de seguir';

            const [result] = await db.query(
                'UPDATE seguir SET status = ? WHERE seguidorId = ? AND seguidoId = ?;',
                [status, seguidor, seguido]
            );

            if (result.affectedRows > 0) {
                return true

            } else {
                return false
            }
        } catch (err) {
            console.error('Erro no método de deixar de seguir um usuário: ' + err)
        }
    }

    static async listarPorId(id) {
        try {
            let query = 
            `SELECT u.id, u.nick, u.foto FROM seguir s
            INNER JOIN usuarios u ON seguidoId = u.id
            WHERE seguidorId = ? AND status = ?`;

            const params = [id, 'seguindo'];

            const [seguidos] = await db.query(query, params);

            if (seguidos.length > 0) {
                return seguidos

            } else {
                return false
            }
            
        } catch (err) {
            console.error('Erro no método de listar seguidos ' + err);
        }
    }
}



module.exports = Seguir;