const db = require('../config/db');

class Curtidas {

    static async curtir (userId, postId) { // Usuário curtindo um post
        try {
            const check = await this.checar(userId, postId);
            console.log('Check no método: ',check);
            if (check == null) { // Se não vier nada, ele insere
                const [curtidas] = await db.query('INSERT into curtidas(usuariosId, postagensId) VALUES(?, ?);', [userId, postId]);
            
                if (curtidas.affectedRows > 0) {
                    const [like] = await db.query('UPDATE postagens SET likes = likes + 1 WHERE id = ?;', [postId]);
    
                    return true
    
                } else {
                    console.error('Curtidas retornou inesperadamente ', curtidas);
                    return false
                }

            } else if (!check) { // Se o status descurtido existir, ele o atualiza
                const status = 'curtido';
                const [curtidas] = await db.query('UPDATE curtidas SET status = ? WHERE usuariosId = ? AND postagensId = ?;', [status, userId, postId]);
                
                if (curtidas.affectedRows > 0) {
                    const [like] = await db.query('UPDATE postagens SET likes = likes + 1 WHERE id = ?;', [postId]);
    
                    return true
    
                } else {
                    console.error('Curtidas retornou inesperadamente ', curtidas);
                    return false
                }
            }
            
        } catch (err) {
            console.error('Erro no modelo curtir: ', err);
        }
    }

    static async checar (userId, postId) { // Checar se o usuário curtiu ou deixou de curtir o post
        try {
            const [check] = await db.query('SELECT status FROM curtidas WHERE usuariosId = ? AND postagensId = ?;', [userId, postId]);

            if (check[0].status == 'curtido') {
                return true

            } else if (check[0].status == 'descurtido') {
                return false

            } else {
                return null
            }

        } catch (err) {
            console.error('Erro no método checar do curtir ', err);
        }
    }

    static async descurtir (userId, postId) { // Usuário descurtindo um post
        try {
            const check = await this.checar(userId, postId);

            if (check) {
                const status = 'descurtido';

                const [tirarLike] = await db.query('UPDATE postagens SET likes = likes - 1 WHERE id = ?;', [postId]);
                const [descurtir] = await db.query('UPDATE curtidas SET status = ? WHERE usuariosId = ? AND postagensId = ?;', [status, userId, postId]);

                if (tirarLike.affectedRows > 0 && descurtir.affectedRows > 0) {
                    return true

                } else {
                    console.error('descurtir retornou inesperadamente ',tirarLike ,descurtir);
                    return false
                }
            } else {
                return false
            }
                

        } catch (err) {
            console.error('Erro no méteodo curtir ', err);
        }
    
    
    
    }
}

module.exports = Curtidas;