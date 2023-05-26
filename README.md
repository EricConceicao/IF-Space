# IF-Space
Rede social para estudantes

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
nick        VARCHAR(50),
dataNasc    DATE NOT NULL,
chave       VARCHAR(64)     NOT NULL,
dataCriacao TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE postagens (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
titulo          VARCHAR(50)     NOT NULL,    
texto           TEXT,
dataCriacao     TIMESTAMP       DEFAULT             CURRENT_TIMESTAMP,
anexos          BLOB, // mudar para o caminho do arquivo
likes           INT,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id)
);


CREATE TABLE curtidas (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
postagensId     INT             NOT NULL,
data            TIMESTAMP       DEFAULT             CURRENT_TIMESTAMP,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (postagensId) REFERENCES postagens(id)
);


CREATE TABLE comentarios (
id              INT             AUTO_INCREMENT      PRIMARY KEY,
usuariosId      INT             NOT NULL,
postagensId     INT             NOT NULL,
comentario      TEXT            NOT NULL,
data            TIMESTAMP       DEFAULT             CURRENT_TIMESTAMP,

FOREIGN KEY (usuariosId) REFERENCES usuarios(id),
FOREIGN KEY (postagensId) REFERENCES postagens(id)
);


CREATE TABLE seguir (
seguidorId      INT         NOT NULL,
seguidoId       INT         NOT NULL,
data            TIMESTAMP   DEFAULT     CURRENT_TIMESTAMP,
status          ENUM('seguindo', 'parou_de_seguir') DEFAULT 'seguindo',

FOREIGN KEY (seguidorId) REFERENCES usuarios(id),
FOREIGN KEY (seguidoId) REFERENCES usuarios(id)
);

## Inserts para teste

INSERT INTO usuarios (email, senha, pNome, sNome, nick, dataNasc)
VALUES

