const usuarioModel = require('../models/usuarios');

exports.cadastrar = async function (req, res) {

    //Pega os dados do formulário
	const {email, senha, pNome, sNome, nick, dataNasc} = req.body;

    //Cria um novo objeto embasado na classe Usuario, e passa os dados correspondentes
    const novoUsuario = new usuarioModel.Usuario(email, senha, pNome, sNome, nick, dataNasc);

    try {
        //chama o método verificarEmail() da classe Usuarios para ver se o email já existe.
        const result = await novoUsuario.verificarEmail();

        //O resultado é um true ou false que diz se o email já existe ou não.
        if (result) {
            return {sucess: false, message: 'Este E-mail já existe :S'}

        } else {
            //chama o método cadastrar() da classe Usuarios para inserir os dados no banco.
            await novoUsuario.cadastrar();
            return {sucess: true, message: 'Cadastro feito com sucesso :D'}; 
        }

    } catch (err) {
        //Apenas em caso de erro
        throw `Erro na operação de cadastro. Erro: ${err.message}`;
    }
}