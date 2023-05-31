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
            console.error('Erro no controlador de postagem: ',err);
            res.redirect('/home?info=Houve um erro interno, tente mais tarde.');
        }
            
    }      
}

exports.exibirPostagens = async function (req, res) {
    try {
    const posts = await Postagem.selecionarPosts(req.usuario.id);

    const info = req.query.info;
    if (req.usuario.nick) {
        const { nick } = req.usuario;
        res.render('principal/home', { name: nick, info, posts });
    } else {
        const { pNome } = req.usuario;
        res.render('principal/home', { name: pNome, info, posts });
    }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}

exports.exibirPaginaDoPost = async function (req, res) {
    id = req.params.id;
    try {
    console.log('id: ',id) 
    const posts = await Postagem.selecionarPostDoUsuario(id);
    console.log('posts: ',posts)
    const info = req.query.info;
    
    if (req.usuario.nick) {
        res.render('principal/userpost', { info, posts });
    } else {
        res.render('principal/userpost', { info, posts });
    }

    } catch (err) {
        console.error('Erro no controlador de exibição de postagens: ', err);
    }
}