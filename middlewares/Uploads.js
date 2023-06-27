const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const slugify = require('slugify');

function checarExtensao(file) {
    const whiteList = ['.jpg', '.jpeg', '.png', '.gif'];
    const extensao = path.extname(file.originalname).toLowerCase();

    // Olha se a extensão do arquivo está no vetor para retornar true ou false.
    return whiteList.includes(extensao);
}

function checarExtensaoBanner(file) {
    const whiteList = ['.jpg', '.jpeg', '.png'];
    const extensao = path.extname(file.originalname).toLowerCase();

    // Olha se a extensão do arquivo está no vetor para retornar true ou false.
    return whiteList.includes(extensao);
}

/*==================================================
  === Configuração para upload da foto de perfil === 
  ==================================================  */

const storageFotos = multer.diskStorage({
    destination: function (req, file, cb) {

        const { id, foto } = req.usuario;
        const caminhoFoto = path.join(process.cwd(), 'public', 'uploads', 'fotos-de-perfil'); // Caminho para a pasta das fotos

        const caminhoAnterior = path.join(process.cwd(), 'public', foto); // Caminho da foto anterior
        const userDirectory = path.join(caminhoFoto, id.toString()); // Caminho para criação da pasta com ID do usuário 
        
        // Verifica se a foto não é a padrão, e se tem uma foto no caminho anterior, para então excluir.
        if (foto != 'padrao.png' && fs.existsSync(caminhoAnterior)) { 
            
            fs.unlink(caminhoAnterior, (err) => {
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
        // Atribui a data atual seguida pelo nome original do arquivo para que ele tenha um nome único
        const data = moment().format('YYYY-MM-DD-HH-mm');
        const nome = slugify(file.originalname, { lower: true });

        const nomeArquivo = `${data}-${nome}`;
        
        cb(null, nomeArquivo);
    }
});

const uploadFoto = multer({
    storage: storageFotos,

    fileFilter: function (req, file, cb) {
        
        if (checarExtensaoBanner(file)) {

            cb(null, true);

        } else {
            cb(new Error('Tipo de arquivo não suportado.'));
        }
    } 
});

/*======================================================
  === Configuração para uploads de imagens de banner === 
  ======================================================*/
  
const storageBanner = multer.diskStorage({
    destination: function (req, file, cb) {

        const { id, banner } = req.usuario;
        const caminhoBanner = path.join(process.cwd(), 'public', 'uploads', 'banners'); // Caminho para a pasta dos banners

        const caminhoAnterior = path.join(process.cwd(), 'public', banner); // Caminho anterior
        const userDirectory = path.join(caminhoBanner, id.toString()); // Caminho para criação da pasta com ID do usuário 

        // Verifica se o banner não é o padrão, e se tem um banner no caminho anterior, para então excluir.
        if (banner != 'banner.jpg' && fs.existsSync(caminhoAnterior)) { 
            
            fs.unlink(caminhoAnterior, (err) => {
                if (err) throw 'Erro ao excluir o banner anterior: ' + err;
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
        // Atribui a data atual seguida pelo nome original do arquivo para que ele tenha um nome único 
        const data = moment().format('YYYY-MM-DD-HH-mm');
        const nome = slugify(file.originalname, { lower: true });

        const nomeArquivo = `${data}-${nome}`;
        
        cb(null, nomeArquivo);
    }
});

const uploadBanner = multer({
    storage: storageBanner,

    fileFilter: function (req, file, cb) {
        if (checarExtensao(file)) {

            cb(null, true);

        } else {
            cb(new Error('Tipo de arquivo não suportado.'));
        }
    } 
});

/*==========================================
  === Configuração para upload de anexos === 
  ==========================================*/

const storageAnexos = multer.diskStorage({
    destination: function (req, file, cb) {

        const { id } = req.usuario;
        const caminhoArquivo = path.join(process.cwd(), 'public', 'uploads', 'anexos'); // Caminho para a pasta dos anexos

        const userDirectory = path.join(caminhoArquivo, id.toString()); // Caminho para criação da pasta com ID do usuário 
        
        // Checa se a pasta de destino existe, e caso não exista. Cria uma
        if (!fs.existsSync(userDirectory)) {
            fs.mkdir(userDirectory, { recursive: true }, (err) => {
                if (err) throw 'Erro ao criar a pasta de destino: ' + err;
            });
        }
        
        cb(null, userDirectory);
    },

    filename: function (req, file, cb) { 
        // Atribui a data atual seguida pelo nome original do arquivo para que ele tenha um nome único 
        const data = moment().format('YYYY-MM-DD-HH-mm');
        const nome = slugify(file.originalname, { lower: true });

        const nomeArquivo = `${data}-${nome}`;
        
        cb(null, nomeArquivo);
    }
});

const uploadAnexo = multer({
    storage: storageAnexos,

    fileFilter: function (req, file, cb) {
        if (file) {
            cb(null, true);

        } else {
            cb(new Error('Tipo de arquivo não suportado.'));
        }
    } 
});

module.exports = { uploadFoto, uploadAnexo, uploadBanner };