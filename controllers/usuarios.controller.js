const Usuario = require('../models/usuarios');
const crypto = require('crypto');

exports.cadastrar = async function (req, res) {

    //Pega os dados do formulário
	const {email, pNome, sNome, nick, dataNasc} = req.body;
    const senha = crypto.createHash('sha256').update(req.body.senha).digest('hex');

    //Verifica se não há valores nulos
    if (!email || !senha || !pNome || !sNome || !dataNasc) {
        throw 'Erro. Campos obrigatórios não preenchidos.'
        res.redirect('/signup');
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
        throw new Error(`Erro na operação de cadastro. Erro: ${err}`);
    }
}

exports.login = async function (req, res) {

    //Pega o email e senha
    const email = req.body.email;
    const senha = crypto.createHash('sha256').update(req.body.senha).digest('hex');
    console.log(email, senha)
    //passa os dados para o modelo
    const usuario = new Usuario(email, senha);

    try {
        const result = await usuario.login();

        if(result) {
            const {email, senha, pNome, sNome, nick, dataNasc} = result
            
            usuario(email, senha, pNome, sNome, nick, dataNasc);
            res.cookie('name', usuario.pNome);
            
            res.redirect('/home')
        } else {
            console.error('Email ou senha incorretos.');
            res.render('index');
        }
    } catch (err) {
        throw new Error('Erro na operação de login:' + err)
    }

}