const Comentarios = require('../models/comentarios');

// Controlador para comentar

exports.comentar = async function (req, res) {
    try {
        const { id, postId } = req.params;
        const { comment } = req.body;

        if (comment.length > 0) {
            const comentario = await Comentarios.comentar(id, postId, comment);

            if (comentario) {
                res.redirect(`/post/user/${postId}?info=Comentário postado!`);
            } else {
                res.redirect(`/post/user/${postId}?info=Erro interno. Tente mais tarde`);
            }
        }

    } catch (err) {
        console.error('Erro no controlador de comentar: ', err);
    }
}