const Seguir = require('../models/seguir');

// Controlador para um usuário seguir outro //

exports.seguir = async function (req, res) {
    try {
        const seguidor = req.usuario.id; // Usuário que clicou para seguir
        const seguido = req.params.id; // Usuário que será seguido
        const postId = req.params.pid // Id do post pra voltar nele

        const check = await Seguir.checarId(seguidor, seguido);

        if (!check) {
            const seguir = await Seguir.seguirId(seguidor, seguido, false);

            if (seguir) {
                res.redirect(`/post/user/${postId}?info=Usuário adicionado à sua lista!`);

            } else {
                console.error('Erro no result ' + err);
                res.redirect(`/post/user/${postId}?info=Erro ao seguir este usuário`);
            }

        } else {
            const seguir = await Seguir.seguirId(seguidor, seguido, true);

            if (seguir) {
                res.redirect(`/post/user/${postId}?info=Usuário adicionado à sua lista!`);

            } else {
                console.error('Erro no result ' + err);
                res.redirect(`/post/user/${postId}?info=Erro ao seguir este usuário`);
            }
        }

    } catch (err) {
        console.error('Erro no controlador de seguir ' + err);
    }
}

/* Controlador para um usuário deixar de seguir outro */

exports.deixarId = async function (req, res) {
    try {
        const seguidor = req.usuario.id; // Usuário que clicou para seguir
        const seguido = req.params.id; // Usuário que será seguido
        const postId = req.params.pid // Id do post pra voltar nele

        const check = await Seguir.checarId(seguidor, seguido);
        
        if (check) {
           const deixarId = await Seguir.pararDeSeguir(seguidor, seguido);

            if (deixarId) {
                res.redirect(`/post/user/${postId}?info=Você não está mais seguindo este usuário`);
            } 

        } else {
            res.redirect(`/post/user/${postId}?info=Você não já não está seguindo este usuário`);
        }
            
    } catch (err) {
        console.error('Erro no controlador de deixar de seguir ' + err);
    }
}

exports.listarSeguidos = async function (req, res, next) {
    try {
        const { id } = req.usuario;
        const seguidos = await Seguir.listarPorId(id);

        res.locals.seguidos = seguidos;
        
        next();

    } catch (err) {
        console.error('Erro no controlador de listagem de seguidos: ' + err);
    }
}