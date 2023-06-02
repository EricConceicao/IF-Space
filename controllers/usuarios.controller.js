const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');

exports.cadastrar = async function (req, res) {
    try {

        //Pega os dados do formulário
        let {email, senha, pNome, sNome, nick, dataNasc} = req.body;
        const hashSenha = await bcrypt.hash(senha, 10);

        //Verifica se não há valores nulos
        if (!email || !senha || !pNome || !sNome || !dataNasc) {

            res.render('/signup', {layout: 'layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Campos obrigatórios em branco'});
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
            res.status(409).render('signup', {layout: 'layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Email já cadastrado' });
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
        const token = await Usuario.login(email, senha);

        if(token) {
            const tokenString = JSON.stringify(token);

            res.cookie('Auth', tokenString, { maxAge: 1000 * 60 * 60 * 12 });
            res.redirect('/home');
        } else {
            res.render('index', { layout: 'layouts/layout-login', title: 'IF - Space | Login', info: 'Senha incorreta' });
        }
    } catch (err) {
        console.error('Erro na operação de login:' + err)
    }

}