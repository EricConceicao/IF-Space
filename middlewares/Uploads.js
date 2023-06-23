const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

/* Configuração para upload da foto de perfil */

// Esse process.cwd() em teoria faz referencia ao local onde o app está executando. sendo a raiz do projeto ./
const caminhoFoto = path.join(process.cwd(), 'public', 'uploads', 'fotos-de-perfil');


function checarExtensao(file) {
    const whiteList = ['.jpg', '.jpeg', '.png', '.gif'];
    const extensao = path.extname(file.originalname).toLowerCase();

    // Olha se a extensão do arquivo está no vetor para retornar true ou false.
    return whiteList.includes(extensao);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id, foto } = req.usuario;
        const userDirectory = path.join(caminhoFoto, id.toString());

        // Verifica se a foto não é a padrão, e se tem uma foto no caminho anterior, para então excluir.
        if (!foto == '/padrao.png' && fs.existsSync(foto)) { 
            fs.unlink(foto, (err) => {
                if (err) throw 'Erro ao excluir a foto anterior: ' + err;
            })
        }
        
        // Checa se a pasta de destino existe, e caso não exista. Cria uma
        if (!fs.existsSync(userDirectory)) {
            fs.mkdir(userDirectory, { recursive: true }, (err) => {
                if (err) throw 'Erro ao criar a pasta de destino: ' + err;
            });
        }
        
        cb(null, userDirectory);
    },

    filename: function (req, file, cb) { 
        // Atribui o nome original do arquivo upado, antecedido pela data do momento atual 
        const data = moment().format('YYYY-MM-DD-HH-mm');
        const nome = file.originalname.toLowerCase();

        const nomeArquivo = `${data}-${nome}`;
        
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