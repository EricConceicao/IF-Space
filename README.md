# IF-Space
Rede social para estudantes

## Chaves no .env

DATABASE = ''
DATABASE_HOST = ''
DATABASE_ROOT = ''
DATABASE_PASS = ''

## Código SQL do nosso banco

DROP DATABASE IF EXISTS ifspace;
CREATE DATABASE ifspace;
USE ifspace;


CREATE TABLE usuarios (
id          INT             AUTO_INCREMENT  PRIMARY KEY,
email       VARCHAR(50)     NOT NULL        UNIQUE,
senha       VARCHAR(64)     NOT NULL,                   
pNome       VARCHAR(25)     NOT NULL,
sNome       VARCHAR(25)     NOT NULL,
nick        VARCHAR(50)     UNIQUE,
foto        VARCHAR(255)    DEFAULT 'padrao.png',
banner      VARCHAR(255)    DEFAULT 'banner.jpg',
dataNasc    DATE            NOT NULL,
curso       VARCHAR(100)    NULL,
hobby       VARCHAR(100)    NULL,
bio         TEXT            NULL,
telefone    VARCHAR(14)     NULL,
chave       VARCHAR(64)     NOT NULL,
dataCriacao TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE postagens (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
autor           VARCHAR(50)     NOT NULL,
titulo          VARCHAR(50)     NOT NULL,    
texto           TEXT,
dataCriacao     TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
anexos          VARCHAR(255)    NULL,
likes           INT             DEFAULT 0,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id)
);


CREATE TABLE curtidas (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
postagensId     INT             NOT NULL,
data            TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (postagensId) REFERENCES postagens(id)
);


CREATE TABLE comentarios (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
postagensId     INT             NOT NULL,
comentario      TEXT            NOT NULL,
data            TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (postagensId) REFERENCES postagens(id)
);


CREATE TABLE seguir (
seguidorId      INT         NOT NULL,
seguidoId       INT         NOT NULL,
data            TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
status          ENUM('seguindo', 'parou de seguir') DEFAULT 'seguindo',

FOREIGN KEY (seguidorId) REFERENCES usuarios(id),
FOREIGN KEY (seguidoId) REFERENCES usuarios(id)
);

## Banco com alguns registros e código para backup

código para importar o arquivo de backup // É mais fácil colocando o arquivo na área de trabalho

mysql -u root -p ifspace < C:caminho/ate/o/backup.sql

Código de backup

mysqldump -u root -p ifspace > C:\Users\cg3024695\Desktop\Curso - 2ºmódulo\IF-Space\banquinho

## Logins de teste

email: bob@gmail.com | estrela@gmail.com | lixo@gmail.com | miau@gmail.com
senha: 12345678      