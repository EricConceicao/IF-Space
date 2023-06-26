const Postagem = require('../models/postagem');
const Usuario = require('../models/usuarios');
const Seguir = require('../models/seguir');

/* Faz uma postagem */

exports.postar = async function (req, res) {
    const { titulo, texto, anexo } = req.body;

    if (!titulo) {
        res.redirect('/post?info=Você esqueceu o seu título chamativo!');
    } else if (!texto) {
        res.redirect('/post?info=Você esqueceu de escrever um lindo texto!');
    } else {
        try {
            const userId = req.usuario.id;
            const user = await Usuario.buscarPorId(userId); // Vai até a o banco buscar o nome para exibição
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

/* Exibir as postagens no seu feed na home */

exports.exibirPostagens = async function (req, res) {
    try {
        const info = req.query.info;
        const posts = await Postagem.selecionarPosts(req.usuario.id);

        if (req.usuario) {
            const { foto, nick, banner } = req.usuario;
            res.render('principal/home',
                { name: nick, title: 'IF - Space | Home', info, posts, foto, banner });

        } else {
            console.error(req.usuario);
            res.redirect('/?info=Algo deu errado ao resgatar os dados. Tente novamente');
        }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}

/* Exibir os dados do post que você acessou da miniatura da home  */

exports.exibirPaginaDoPost = async function (req, res) {
    try {
        const postId = req.params.id;
        const userId = req.usuario.id;

        const info = req.query.info;

        let opt = { form: true, msg: '', link: '' };

        const post = await Postagem.selecionarPostExpecifico(postId);

        const check = await Seguir.checarId(userId, post.usuariosId); // Vê se o usuário segue ou não a pessoa da postagem

        if (userId == post.usuariosId) { // Se o post for do usuário. Ele não vai rederizar os botões Like e seguir.
            opt.form = false;
        }

        if (check.status == 'seguindo') { // Isso altera o botão e o action do formulário para seguir, com base no resultado de check.
            opt.msg = 'Deixar de seguir';
            opt.link = '/seguir/deixar';
        } else {
            opt.msg = 'Seguir';
            opt.link = '/seguir';
        }

        if (post) {
            const { foto, banner } = post;
            res.render('principal/userpost',
                { name: post.autor, title: `Postagem | ${post.autor}`, info, post, foto, banner, opt });

        } else {
            res.redirect('/home?info=Algo deu errado ao resgatar os dados. Tente novamente');
        }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}

// Controlador para retornar os posts do usuário //

exports.exibirPostsDoUsuario = async function (req, res, next) {
    try {
        const info = req.query.info;
        let id;

        if (req.params.id) { // Se tiver parâmetros com id. Ele usa para resgatar os dados do usuário que você clicou
            id  = req.params.id;

        } else { // Senão ele pega o id do usuário. E usa para ver seu perfil próprio
            id = req.usuario.id;
        }
        
        const posts = await Postagem.selecionarPostsDoUsuario(id);

        res.locals.posts = posts;
        next();

    } catch (err) {
        console.error('Erro no controlador de exibir os posts: ', err);
    }
}