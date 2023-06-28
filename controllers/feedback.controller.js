const Feedback = require('../models/feedback'); 

exports.enviar = async function (req, res) {
    try {
        const { email, text } = req.body;

        if (email && text.length > 0) {
            const enviar = await Feedback.enviar(email, text);

            if (enviar) {
                res.redirect('/contato?info=Obrigado pelo seu feedback!');
            } else {
                res.redirect('/contato?info=Houve um erro no envio. Tente mais tarde');
            }
        } else {
            let info = 'Erro, campos não preenchidos.'
            res.render('contato', { layout: false, title: 'IF - Space | Contato', info, email, text });
        }
        
    } catch (err) {
        console.error('Erro no controlador de envios de feedback: ', err);
    }
}

exports.listar = async function (req, res) {
    try {
        const lista = await Feedback.listar();

        res.render('listagem', { layout: false, title: 'IF - Space | Feedbacks', lista });

    } catch (err) {
        console.error('Erro no controlador de listagem de feedback: ', err);
    }
}