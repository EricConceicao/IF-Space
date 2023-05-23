const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');

exports.cadastrar = async function (req, res) {
    try {

        //Pega os dados do formulário
        const {email, senha, pNome, sNome, nick, dataNasc} = req.body;
        const hashSenha = await bcrypt.hash(senha, 10);

        //Verifica se não há valores nulos
        if (!email || !senha || !pNome || !sNome || !dataNasc) {

            res.render('/signup', {erro: 'Campos obrigatórios em branco'});
        }

        //chama o método verificarEmail() da classe Usuarios para ver se o email já existe.
        const result = await Usuario.procurarEmail(email);

        //O resultado é um true ou false que diz se o email já existe ou não.
        if (!result) {
            //chama o método cadastrar() da classe Usuarios para inserir os dados no banco.
            await Usuario.cadastrar(email, hashSenha, pNome, sNome, nick, dataNasc);
            res.redirect('/');
        } else {
            res.status(400).render('signup', {erro: 'Email já cadastrado' });
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
        console.log('token recebido: ', token)
        if(token) {
            res.setHeader('Authorization', 'Bearer ' + token);
            res.redirect('/home');
        } else {
            console.error('Email ou senha incorretos.');
            res.render('index', {erro: 'Senha incorreta'});
        }
    } catch (err) {
        console.error('Erro na operação de login:' + err)
    }

}