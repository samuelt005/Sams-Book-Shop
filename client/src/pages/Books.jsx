import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// O Axios é uma biblioteca JavaScript que facilita a realização de requisições HTTP (como GET, POST, PUT, DELETE, etc.) a serviços web.
// Ele é frequentemente usado para realizar solicitações a APIs RESTful, permitindo que você interaja com serviços externos para obter ou enviar dados.
import axios from "axios";

const Books = () => {
    
    // UseState é utilizado para armazenar o estado da lista de livros
    const [books, setBooks] = useState([]);

    // UseEffect é usado para buscar a lista de livros quando o componente é montado
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                // Faz uma requisição GET para obter a lista de livros do servidor
                const res = await axios.get("http://localhost:8800/books");
                // Atualiza o estado com os dados recebidos
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    // A função handleDelete é chamada ao clicar no botão "Excluir" de um livro e faz uma requisição DELETE para a API
    const handleDelete = async (id) => {
        try {
            // Faz uma requisição DELETE para excluir um livro com o ID fornecido usando biblioteca Axios
            await axios.delete("http://localhost:8800/books/" + id);
            // Recarrega a página para atualizar a lista de livros após a exclusão
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main-container">
            <h1>SAMS BOOK SHOP</h1>
            <hr></hr>
            <div className="books">
                {/* O método .map é usado para percorrer a lista de livros e renderizar as informações de cada livro na tela */}
                {/* O ideal seria abstrair este método map para um componente a parte, ou seja, existira um componente Books e Book */}
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>Preço: R$ {book.price}</span>
                        <div className="buttons">
                            {/* Botão para editar um livro, linkando para a rota de atualização */}
                            <button className="update">
                                <Link to={`/update/${book.id}`}>Editar</Link>
                            </button>
                            {/* Botão para excluir um livro, chama a função handleDelete */}
                            <button
                                className="delete"
                                onClick={() => handleDelete(book.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Botão para adicionar um novo livro, linkando para a rota de adição */}
            <button className="add">
                <Link to="/Add">ADICIONAR NOVO LIVRO</Link>
            </button>
        </div>
    );
};

export default Books;
