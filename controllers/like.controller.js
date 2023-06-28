const Curtidas = require('../models/curtidas');

exports.curtir = async function (req, res) {
    try {
        const { id, postId } = req.params; // Id do autor do post e do post
        const userId = req.usuario.id; // Id do usuário  

        if (id !== userId) { // Como medida para garantir que o usuário não curta o post dele mesmo

            const curtido = await Curtidas.curtir(userId, postId);

            if (curtido) {
                res.redirect(`/post/user/${postId}?info=Você curtiu este post!`);

            } else {
                res.redirect(`/post/user/${postId}?info=Erro inesperado. Tente mais tarde`);
            }
        }

    } catch (err) {
        console.error('Erro no controlador de curtir: ', err);
    }    
}

exports.descurtir = async function (req, res) {
    try {
        const { id, postId } = req.params; // Id do autor do post e do post
        const userId = req.usuario.id; // Id do usuário  

        if (id !== userId) { // Como medida para garantir que o usuário não descurta o post dele mesmo

            const descurtir = await Curtidas.descurtir(userId, postId);

            if (descurtir) {
                res.redirect(`/post/user/${postId}?info=Você deixou de curtir este post!`);

            } else {
                res.redirect(`/post/user/${postId}?info=Erro inesperado. Tente mais tarde`);
            }
        }

    } catch (err) {
        console.error('Erro no controlador de descurtir ', err);
    }
}