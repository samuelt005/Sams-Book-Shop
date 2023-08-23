import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sams_book_shop",
});

// Test connection to backend
app.listen(8800, () => {
    console.log("Connected to backend!");
});

// Test connection to database
db.connect((err) => {
    if (err) {
        console.error("Error trying to connect to database:", err);
    } else {
        console.log("Connected to database!");
    }
});

// Endpoints
app.get("/", (req, res) => {
    res.json("Hello, this is backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q =
        "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";

    // Converte o preço de string para decimal usando parseFloat
    const price = parseFloat(req.body.price);

    // Check if the client sent a cover image link or not
    if (req.body.cover) {
        const values = [
            req.body.title,
            req.body.desc,
            price,
            req.body.cover,
        ];

        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json("O livro foi criado com sucesso!");
        });
    } else {
        // Client didn't provide a cover image link, use the default cover path
        const defaultCoverPath = "default_cover.webp";
        const values = [
            req.body.title,
            req.body.desc,
            price,
            defaultCoverPath,
        ];

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

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(
            "O livro foi excluido com sucesso!"
        );
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    // Converte o preço de string para decimal usando parseFloat
    const price = parseFloat(req.body.price);

    // Check if the client sent a cover image link or not
    if (req.body.cover) {
        const values = [
            req.body.title,
            req.body.desc,
            price,
            req.body.cover,
        ];

        db.query(q, [...values, bookId], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(
                "O livro foi atulizado com sucesso!"
            );
        });
    } else {
        // Client didn't provide a cover image link, use the default cover path
        const defaultCoverPath = "default_cover.webp";
        const values = [
            req.body.title,
            req.body.desc,
            price,
            defaultCoverPath,
        ];

        db.query(q, [...values, bookId], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(
                "O livro foi atulizado com sucesso!"
            );
        })
    }
});