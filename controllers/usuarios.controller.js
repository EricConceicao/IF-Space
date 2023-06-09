const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const moment = require('moment');
const path = require('path');

// Controlador do cadastro //

exports.cadastrar = async function (req, res) {
    try {

        //Pega os dados do formulário
        let { email, senha, pNome, sNome, nick, dataNasc } = req.body;
        const hashSenha = await bcrypt.hash(senha, 10);

        //Verifica se não há valores nulos
        if (!email || !senha || !pNome || !sNome || !dataNasc) {

            res.render('/signup', { layout: './layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Campos obrigatórios em branco' });
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
            res.status(409).render('signup', { layout: './layouts/layout-login', title: 'IF - Space | Cadastro', erro: 'Email já cadastrado' });
        }

    } catch (err) {
        //Apenas em caso de erro
        console.error('Erro na operação de cadastro ' + err);
    }
}

// Controlador do login //

exports.login = async function (req, res) {

    //Pega o email e senha
    const { email, senha } = req.body;

    try {
        const login = await Usuario.login(email, senha, req, res);

        if (login.result) {
            res.redirect('/home');
        } else {
            res.render('index', { layout: './layouts/layout-index', title: 'IF - Space | Login', info: login.erro });
        }
    } catch (err) {
        console.error('Erro na operação de login:' + err);
    }

}

// Controlador para exibir os dados do usuário //

exports.exibirPerfil = async function (req, res) {
    try {
        const info = req.query.info;

        if (req.params.id) {
            const { id } = req.params;
            const dados = await Usuario.buscarPorId(id);
            
            if (dados) {
                const { nick, foto, banner } = dados;
                dados.dataNasc = moment(dados.dataNasc).format('DD/MM/YYYY');

                res.render('principal/userprofile', { name: nick, title: `IF - Space | ${nick}`, dados, info, foto, banner });
            } else {
                res.redirect('/home?info=Erro ao carregar dados do usuário para exibição');
            }

        } else {
            const { email } = req.usuario;
            const dados = await Usuario.procurarEmail(email);

            if (dados) {
                const { nick, foto, banner } = req.usuario;

                dados.dataNasc = moment(dados.dataNasc).format('DD/MM/YYYY');
                                                                                                                             
                res.render('principal/profile', { name: nick, title: `IF - Space | ${nick}`, dados, info, foto, banner });
            } else {
                res.redirect('/home?info=Erro ao carregar dados para exibição');
            }
        }
    } catch (err) {
        console.error('Erro no controlador para exibição de dados do perfil. ' + err);
    }

}

// Controlador da edição do perfil de usuário //

exports.editar = async function (req, res) {
    let { pNome, sNome, nick, dataNasc, curso, hobby, bio, email, telefone, senha } = req.body;

    if (senha && pNome || sNome || nick || dataNasc || curso || hobby || bio || email || telefone) {
        try {
            const id = req.usuario.id;
            const user = await Usuario.procurarEmail(req.usuario.email);
            checkSenha = await Usuario.compararSenha(senha, user.senha);

            if (checkSenha) {

                let query = 'UPDATE usuarios SET';
                const params = [];

                if (pNome) {
                    query += ' pNome = ?,';
                    params.push(pNome);
                }

                if (sNome) {
                    query += ' sNome = ?,';
                    params.push(sNome);
                }

                if (nick) {
                    query += ' nick = ?,';
                    params.push(nick);
                }

                if (dataNasc) {
                    query += ' dataNasc = ?,';
                    params.push(dataNasc);
                }

                if (curso) {
                    query += ' curso = ?,';
                    params.push(curso);
                }

                if (hobby) {
                    query += ' hobby = ?,';
                    params.push(hobby);
                }

                if (bio) {
                    query += ' bio = ?,';
                    params.push(bio);
                }

                if (telefone) {
                    query += ' telefone = ?,';
                    params.push(telefone);
                }

                if (email) {
                    query += ' email = ?,';
                    params.push(email);
                }

                // Tira a vírgula extra no final
                query = query.slice(0, -1);

                // Coloca o WHERE no final
                query += ' WHERE id = ?';
                params.push(id);

                resultEditar = await Usuario.editarDados(query, params, req, res, nick);
                
                if (resultEditar) {
                    res.redirect('/perfil?info=Edição bem sucedida!');
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

/* Controlador de uploads do usuário */

exports.upload = async function (req, res) {
    try {
        if (req.file.fieldname == 'foto') { // Se vier do campo 'foto'
            const nomeArquivo = req.file.filename;
            const { id } = req.usuario;
            let coluna = 'foto';

            caminho = path.join('uploads', 'fotos-de-perfil', id.toString(), nomeArquivo);
            
            const result = await Usuario.mudarImagem(caminho.replace(/\\/g, '/'), coluna, id);

            if (result) {
                req.usuario.foto = caminho;
                const token = await Usuario.token(req.usuario, req, res);

                res.redirect('/perfil?info=Foto de perfil alterada!');  
            } else {
                res.redirect('/perfil?info=Erro interno. Tente mais tarde');
            }

        } else if (req.file.fieldname == 'banner') { // Se vier do campo 'banner'
            const nomeArquivo = req.file.filename;
            const { id } = req.usuario;
            let coluna = 'banner';

            caminho = path.join('uploads', 'banners', id.toString(), nomeArquivo);
            
            const result = await Usuario.mudarImagem(caminho.replace(/\\/g, '/'), coluna, id);

            if (result) {
                req.usuario.banner = caminho;
                const token = await Usuario.token(req.usuario, req, res);

                res.redirect('/perfil?info=Banner alterado!');  
            } else {
                res.redirect('/perfil?info=Erro interno. Tente mais tarde');
            }
        } else {
            res.redirect('/perfil?info=Nada foi enviado...');
        }
        
    } catch (err) {
        console.error('Erro no controlador de uploads ' + err);
    }
}