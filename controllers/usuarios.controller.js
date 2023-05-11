const Usuario = require('../models/usuarios');

exports.cadastrar = async function (req, res) {

    //Pega os dados do formulário
	const {email, senha, pNome, sNome, nick, dataNasc} = req.body;

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
    const { email, senha } = req.body;

    //passa os dados para o modelo
    const novoUsuario = new Usuario(email, senha);
    try {
        const result = await novoUsuario.login();

        if(result) {
            res.cookie('name', novoUsuario.pNome);
            res.redirect('/home');
        } else {
            throw 'Email ou senha incorretos.'
        }
    } catch (err) {
        throw 'Erro na operação de login: ',err
    }

}