import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="main-container">
            <h1>SAMS BOOK SHOP</h1>
            <hr></hr>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>Preço: R$ {book.price}</span>
                        <div className="buttons">    
                            <button className="update"><Link to={`/update/${book.id}`}>Editar</Link></button>
                            <button className="delete" onClick={() => handleDelete(book.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add">
                <Link to="/Add">ADICIONAR NOVO LIVRO</Link>
            </button>
        </div>
    );
};

export default Books;
