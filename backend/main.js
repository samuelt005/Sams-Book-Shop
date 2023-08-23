import express from "express";
import cors from "cors";
import mysql from "mysql";

// Instânciando a framework Express.js
// O Express.js é um framework para construir aplicativos web e APIs em Node.js de maneira mais fácil e eficiente,
// fornecendo uma variedade de recursos e abstrações para lidar com tarefas comuns no desenvolvimento web.
const app = express();

// Habilita o middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());
// Habilita o middleware para lidar com políticas de CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Criando a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sams_book_shop",
});

// Iniciando o servidor da aplicação
app.listen(8800, () => {
    console.log("Conectado ao back-end!");
});

// Testando a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error("Erro ao tentar conectar com o banco de dados: ", err);
    } else {
        console.log("Conectado ao banco de dados!");
    }
});

// Endpoint root
app.get("/", (req, res) => {
    res.json("Hello, this is backend");
});

// Endpoint para buscar todos os livros
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    
    // Requisição ao DB para buscar todos os livros
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// Endpoint para adicionar um novo livro
app.post("/books", (req, res) => {
    const q =
        "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";

    // Converte o preço de string para decimal usando parseFloat
    const price = parseFloat(req.body.price);

    // Verifica se o cliente forneceu um link de capa ou não
    if (req.body.cover) {
        const values = [
            req.body.title,
            req.body.desc,
            price,
            req.body.cover,
        ];

        // Requisição ao DB para inserir um novo livro
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json("O livro foi criado com sucesso!");
        });
    } else {
        // Cliente não forneceu um link de capa, usa o caminho padrão da capa
        const defaultCoverPath = "default_cover.webp";
        const values = [
            req.body.title,
            req.body.desc,
            price,
            defaultCoverPath,
        ];
        
        // Requisição ao DB para inserir um novo livro onde a capa não foi incluída
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(
                "O livro foi criado com sucesso, todavia não foi fornecido uma imagem para o mesmo!"
            );
        });
    }
});

// Endpoint para excluir um livro por ID
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    // Requisição ao DB para excluir um livro
    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(
            "O livro foi excluído com sucesso!"
        );
    })
})

// Endpoint para atualizar um livro por ID
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    // Converte o preço de string para decimal usando parseFloat
    const price = parseFloat(req.body.price);

    // Verifica se o cliente forneceu um link de capa ou não
    if (req.body.cover) {
        const values = [
            req.body.title,
            req.body.desc,
            price,
            req.body.cover,
        ];

        // Requisição ao DB para alterar os dados de determinado livro
        db.query(q, [...values, bookId], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(
                "O livro foi atulizado com sucesso!"
            );
        });
    } else {
        // Cliente não forneceu um link de capa, usa o caminho padrão da capa
        const defaultCoverPath = "default_cover.webp";
        const values = [
            req.body.title,
            req.body.desc,
            price,
            defaultCoverPath,
        ];

        // Requisição ao DB para alterar os dados de determinado livro onde a capa não foi incluída
        db.query(q, [...values, bookId], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(
                "O livro foi atulizado com sucesso, todavia não foi fornecido uma imagem para o mesmo!"
            );
        })
    }
});