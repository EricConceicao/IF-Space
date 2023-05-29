const Postagem = require('../models/postagem');

exports.postar = async function (req, res) {
    const { titulo, texto, anexo } = req.body;
    
    if (!titulo) {
        res.redirect('/post?info=Você esqueceu o seu título chamativo!');
    } else if (!texto) {
        res.redirect('/post?info=Você esqueceu de escrever um lindo texto!');
    } else {
        try {
            const result = await Postagem.postar(req.usuario.id, titulo, texto, anexo);

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
    console.log('info da postagem: ', posts);

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