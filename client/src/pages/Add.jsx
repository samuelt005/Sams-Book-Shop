import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const navigate = useNavigate();

    // Estado para armazenar as informações do livro a ser atualizado
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    // Função para atualizar o estado das informações do livro
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Função para lidar com o clique no botão de atualização
    const handleClick = async (e) => {
        e.preventDefault();

        // Verifica campos vazios e adiciona a classe required-input
        const emptyFields = Object.keys(book).filter((key) => {
            return (
                key !== "cover" &&
                (key === "price" ? book[key] === null : !book[key])
            );
        });

        // Adiciona a classe de estilo "required-input" aos campos vazios
        emptyFields.forEach((field) => {
            const inputElement = document.querySelector(`[name="${field}"]`);
            if (inputElement) {
                inputElement.classList.add("required-input");
            }
        });

        // Se houver campos vazios, não prossegue com a atualização
        if (emptyFields.length > 0) {
            return;
        }

        try {
            // Faz uma requisição POST para inserir as informações do novo livro
            await axios.post("http://localhost:8800/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h1>ADICIONAR LIVRO</h1>
                <input
                    type="text"
                    placeholder="Título"
                    onChange={handleChange}
                    name="title"
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    onChange={handleChange}
                    name="desc"
                    required
                />
                <input
                    type="number"
                    placeholder="Valor"
                    onChange={handleChange}
                    name="price"
                    required
                />
                <input
                    type="text"
                    placeholder="Capa"
                    onChange={handleChange}
                    name="cover"
                />
                <button className="form-button" onClick={handleClick}>
                    ADICIONAR
                </button>
            </div>
        </div>
    );
};

export default Add;
