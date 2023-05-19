const Usuario = require('../models/usuarios');
const crypto = require('crypto');

exports.cadastrar = async function (req, res) {

    //Pega os dados do formulário
	const {email, pNome, sNome, nick, dataNasc} = req.body;
    const senha = crypto.createHash('sha256').update(req.body.senha).digest('hex');

    //Verifica se não há valores nulos
    if (!email || !senha || !pNome || !sNome || !dataNasc) {

        res.render('/signup', {erro: 'Campos obrigatórios em branco'});
    }
    
    //Cria um novo objeto embasado na classe Usuario, e passa os dados correspondentes
    const novoUsuario = new Usuario(email, senha, pNome, sNome, nick, dataNasc);
    
    try {
        //chama o método verificarEmail() da classe Usuarios para ver se o email já existe.
        const result = await novoUsuario.verificarEmail();

        //O resultado é um true ou false que diz se o email já existe ou não.
        if (!result) {
            //chama o método cadastrar() da classe Usuarios para inserir os dados no banco.
            await novoUsuario.cadastrar();
            res.redirect('/');
        } else {
            res.status(400).send('Email já cadastrado');
    
        }

    } catch (err) {
        //Apenas em caso de erro
        console.error(`Erro na operação de cadastro. Erro: ${err}`);
    }
}

exports.login = async function (req, res) {

    //Pega o email e senha
    const email = req.body.email;
    const senha = crypto.createHash('sha256').update(req.body.senha).digest('hex');

    try {
        const result = await Usuario.login(email, senha);

        if(result) {
            req.session.usuario = result;
            
            res.redirect('/home')
        } else {
            console.error('Email ou senha incorretos.');
            res.render('index');
        }
    } catch (err) {
        console.error('Erro na operação de login:' + err)
    }

}