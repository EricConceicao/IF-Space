const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

/* Configuração para upload da foto de perfil */

const caminhoFoto = path.join(process.cwd(), 'public', 'uploads', 'fotos-de-perfil');


function checarExtensao(file) {
    const whiteList = ['.jpg', '.jpeg', '.png', '.gif'];
    const extensao = path.extname(file.originalname).toLowerCase();

    // Olha se a extensão do arquivo está no vetor para retornar true ou false.
    return whiteList.includes(extensao);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        const { id } = req.usuario;

        const userDirectory = path.join(caminhoFoto, id.toString());
        
        if (!fs.existsSync(userDirectory)) {
            fs.mkdir(userDirectory, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
        
        cb(null, userDirectory);
    },

    filename: function (req, file, cb) {
        const dataAtual = moment();
        const dataFormatada = dataAtual.format('YYYY-MM-DD HH:MM');

        const nomeArquivo = file.originalname;

        cb(null, nomeArquivo);
    }
});

const uploadFoto = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {
        if (checarExtensao(file)) {

            cb(null, true);

        } else {
            cb(new Error('Tipo de arquivo não suportado.'));
        }
    } 
});

module.exports = uploadFoto;