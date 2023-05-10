const Usuario = require('../models/usuarios');

exports.cadastrar = async function (req, res) {

    //Pega os dados do formulário
	const {email, senha, pNome, sNome, nick, dataNasc} = req.body;

    //Cria um novo objeto embasado na classe Usuario, e passa os dados correspondentes
    const novoUsuario = new Usuario(email, senha, pNome, sNome, nick, dataNasc);
    if (!email || !senha || !pNome || !sNome || !dataNasc) {
        alert('Erro. Campos obrigatórios não preenchidos.');
        res.redirect('/');
    }

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