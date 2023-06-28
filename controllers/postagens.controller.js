const Postagem = require('../models/postagem');
const Usuario = require('../models/usuarios');
const Seguir = require('../models/seguir');
const Curtidas = require('../models/curtidas');
const Comentarios = require('../models/comentarios');

const path = require('path');

/* Faz uma postagem */

exports.postar = async function (req, res) {
    const { titulo, texto } = req.body;

    if (!titulo) {
        res.redirect('/post?info=Você esqueceu o seu título chamativo!');
    } else if (!texto) {
        res.redirect('/post?info=Você esqueceu de escrever um lindo texto!');
    } else {
        try {
            const nomeArquivo = req.file.filename;
            const userId = req.usuario.id;
            const autor = req.usuario.nick;
            const caminho = path.join('uploads', 'anexos', userId.toString(), nomeArquivo);

            const result = await Postagem.postar(userId, titulo, texto, autor, caminho);

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
        const user = { id: req.usuario.id, foto: req.usuario.foto, nick: req.usuario.nick };

        const info = req.query.info;

        let opt = { form: true, msg: '', linkSeguir: '', linkCurtir: '' };

        const post = await Postagem.selecionarPostExpecifico(postId);
        const comentarios = await Comentarios.listar(postId);

        const checkSeguir = await Seguir.checarId(user.id, post.usuariosId); // Vê se o usuário segue ou não a pessoa da postagem
        const checkCurtida = await Curtidas.checar(user.id, postId);
        
        // Se o post for do usuário. Ele não vai rederizar os botões Like e seguir.
        if (user.d == post.usuariosId) {
            opt.form = false;
        }
        
        // Isso altera o botão e o action do formulário para seguir, com base no resultado de check.
        if (checkSeguir.status == 'seguindo') { 
            opt.msg = 'Deixar de seguir';
            opt.linkSeguir = '/seguir/deixar';
        } else {
            opt.msg = 'Seguir';
            opt.linkSeguir = '/seguir';
        }

        // Altera o action do formulário caso ele já tenha curtido, ou não.
        if (checkCurtida) {
            opt.linkCurtir = '/curtir/deixar';
        } else {
            opt.linkCurtir = '/curtir';
        }

        if (post) {
            const { foto, banner } = post;
            res.render('principal/userpost',
                { name: post.autor, title: `Postagem | ${post.autor}`, info, post, foto, banner, user, opt, comentarios });

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