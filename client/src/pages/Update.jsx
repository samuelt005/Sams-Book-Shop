import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Check for empty fields and add the required-input class
        const emptyFields = Object.keys(book).filter((key) => {
            return (
                key !== "cover" &&
                (key === "price" ? book[key] === null : !book[key])
            );
        });

        emptyFields.forEach((field) => {
            const inputElement = document.querySelector(`[name="${field}"]`);
            if (inputElement) {
                inputElement.classList.add("required-input");
            }
        });

        if (emptyFields.length > 0) {
            return;
        }

        try {
            await axios.put("http://localhost:8800/books/" + bookId, book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h1>ATUALIZAR LIVRO</h1>
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
                    ATUALIZAR
                </button>
            </div>
        </div>
    );
};

export default Update;
