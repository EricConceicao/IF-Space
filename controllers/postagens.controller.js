const Postagem = require('../models/postagem');
const Usuario = require('../models/usuarios');

exports.postar = async function (req, res) {
    const { titulo, texto, anexo } = req.body;

    if (!titulo) {
        res.redirect('/post?info=Você esqueceu o seu título chamativo!');
    } else if (!texto) {
        res.redirect('/post?info=Você esqueceu de escrever um lindo texto!');
    } else {
        try {
            const userId = req.usuario.id;
            const user = await Usuario.buscarNome(userId); // Vai até a o banco buscar o nome para exibição
            const autor = user.nick;

            const result = await Postagem.postar(userId, titulo, texto, autor, anexo);

            if (result) {
                res.redirect('/home?info=Postagem Enviada!');
            }
        }
        catch (err) {
            console.error('Erro no controlador de postagem: ', err);
            res.redirect('/home?info=Houve um erro interno, tente mais tarde.');
        }

    }
}

exports.exibirPostagens = async function (req, res) {
    try {
        const posts = await Postagem.selecionarPosts(req.usuario.id);

        const info = req.query.info;
        if (req.usuario) {
            const { nick } = req.usuario;
            res.render('principal/home', { name: nick, title: 'IF - Space | Home', info, posts });
        } else {
            console.error(req.usuario);
            res.redirect('/?info=Algo deu errado ao resgatar os dados. Tente novamente');
        }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}

exports.exibirPaginaDoPost = async function (req, res) {
    id = req.params.id;
    try {

        const posts = await Postagem.selecionarPostDoUsuario(id);

        const info = req.query.info;

        if (req.usuario) {
            res.render('principal/userpost', { name: posts.autor, title: 'IF - Space | Postagem', info, posts });
        } else {
            res.redirect('/home?info=Algo deu errado ao resgatar os dados. Tente novamente');
        }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}