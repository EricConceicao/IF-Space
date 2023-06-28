const db = require('../config/db');

class Feedback {

    static async enviar(email, text) {
        try {
            const [envio] = await db.query('INSERT INTO feedbacks(email, texto) VALUES(?, ?);', [email, text]);

            if (envio.affectedRows > 0) {
                return true
            } else {
                return false
            };

        } catch (err) {
            console.error('Erro no método de envio de feedback: ', err);
        }
    }   

    static async listar() {
        try {
            const [lista] = await db.query('SELECT * FROM feedbacks');

            if (lista.length > 0) {
                return lista
            } else {
                return false
            };

        } catch (err) {
            console.error('Erro no método de listagem de feedback: ', err);
        }
    }  
}

module.exports = Feedback;