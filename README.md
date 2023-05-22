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
anexos          BLOB,
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
('joao.silva@example.com', sha2('password123', 256), 'João', 'Silva', 'joaosilva', '1990-05-10'),
('maria.souza@example.com', sha2('password123', 256), 'Maria', 'Souza', 'mariasouza', '1995-07-22'),
('fernando.santos@example.com', sha2('password123', 256), 'Fernando', 'Santos', 'fernandosantos', '1988-02-15'),
('juliana.ferreira@example.com', sha2('password123', 256), 'Juliana', 'Ferreira', 'julianaferreira', '1992-09-08'),
('pedro.almeida@example.com', sha2('password123', 256), 'Pedro', 'Almeida', 'pedroalmeida', '1986-12-03'),
('camila.oliveira@example.com', sha2('password123', 256), 'Camila', 'Oliveira', 'camilaoliveira', '1998-04-18'),
('luiz.gomes@example.com', sha2('password123', 256), 'Luiz', 'Gomes', 'luizgomes', '1991-11-30'),
('ana.santana@example.com', sha2('password123', 256), 'Ana', 'Santana', 'anasantana', '1989-08-24'),
('carlos.silveira@example.com', sha2('password123', 256), 'Carlos', 'Silveira', 'carlossilveira', '1997-01-27'),
('lucia.rodrigues@example.com', sha2('password123', 256), 'Lúcia', 'Rodrigues', 'luciarodrigues', '1993-06-12');
