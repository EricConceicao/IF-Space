const multer = require('multer');
const { path } = require('../app');
const fs = require('fs');

/* Configuração para upload da foto de perfil */

const caminhoFoto = path.join(process.cwd(), 'uploads', 'fotos de perfil');

function checarExtensao(file) {
    const whiteList = ['.jpg', '.jpeg', '.png', '.gif'];
    const extensao = path.extname(file.originalName).toLowerCase();
    // Olha se a extensão do arquivo está no vetor para retornar true ou false.
    return whiteList.includes(extensao);
}

const uploadFoto = multer({
    dest: caminhoFoto,
    fileFilter: function (req, file, cb) {
        if (checarExtensao(file)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não suportado.'));
        }
    },
    filename: function (req, file, cb) {
        const id = req.usuario.id;

        const userDirectory = path.join(caminhoFoto, id.toString());

        if (!fs.existsSync(userDirectory)) {
            fs.mkdir(userDirectory);
        }

        const nomeArquivo = Date().now() + '-' + file.originalName;
        cb(null, nomeArquivo);
    }
});

module.exports = uploadFoto;