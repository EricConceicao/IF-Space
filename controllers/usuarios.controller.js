const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');

exports.cadastrar = async function (req, res) {
    try {

        //Pega os dados do formulário
        let { email, senha, pNome, sNome, nick, dataNasc } = req.body;
        const hashSenha = await bcrypt.hash(senha, 10);

        //Verifica se não há valores nulos
        if (!email || !senha || !pNome || !sNome || !dataNasc) {

            res.render('/signup', {layout: './layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Campos obrigatórios em branco'});
        }

        if (!nick) {
            nick = await Usuario.concatName(pNome, sNome);
        }

        //chama o método verificarEmail() da classe Usuarios para ver se o email já existe.
        const result = await Usuario.procurarEmail(email);

        //O resultado é um true ou false que diz se o email já existe ou não.
        if (!result) {
            //chama o método cadastrar() da classe Usuarios para inserir os dados no banco.
            await Usuario.cadastrar(email, hashSenha, pNome, sNome, nick, dataNasc);
            res.redirect('/?info=Cadastro feito com sucesso!');
        } else {
            res.status(409).render('signup', {layout: './layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Email já cadastrado' });
        }

    } catch (err) {
        //Apenas em caso de erro
        console.error('Erro na operação de cadastro ' + err);
    }
}   

exports.login = async function (req, res) {

    //Pega o email e senha
    const { email, senha } = req.body;

    try {
        const result = await Usuario.login(email, senha);

        if(result.result) {
            const tokenString = JSON.stringify(result.values);

            res.cookie('Auth', tokenString, { maxAge: 1000 * 60 * 60 });
            res.redirect('/home');
        } else {
            res.render('index', { layout: './layouts/layout-index', title: 'IF - Space | Login', info: result.erro });
        }
    } catch (err) {
        console.error('Erro na operação de login:' + err);
    }

}

exports.editar = async function (req, res) {
    console.log('aaa')
    let { pNome, sNome, nick, dataNasc, cursando, hobbies, bio, telefone, senha } = req.body;

    if (senha && pNome || sNome || nick || dataNasc || cursando || hobbies || bio || telefone) {
        try {
            
            checkSenha = await Usuario.compararSenha(senha);
             
            if (checkSenha) {
                const id = req.usuario.id;
                result = await Usuario.editarDados(id, pNome, sNome, nick, dataNasc, cursando, hobbies, bio, telefone);

                if (result) {
                    res.redirect('/home?info=Edição bem sucedida!');
                } else {
                    res.redirect('/perfil?info=Erro interno, tente mais tarde');
                }

            } else {
                res.redirect('/perfil?info=Senha incorreta');
            }

        } catch (err) {
            console.error('Erro no controlador de edição de dados' + err);
        }
    } else {
        res.redirect('/perfil?info=Nenhum dado submetido para atualização');
    }

}