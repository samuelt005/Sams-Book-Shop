import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css";

// O React Router DOM é uma biblioteca de roteamento para aplicações React que facilita a criação e gerenciamento de rotas em uma aplicação de página única (SPA). 
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        <div className="App">
            {/*O componente BrowserRouter fornece o contexto de roteamento para a aplicação,
            permitindo que ela navegue e exiba os componentes corretos com base nos URLs acessados.*/}
            {/* Inicializa o roteador BrowserRouter para gerenciar as rotas */}
            <BrowserRouter>
                <Routes>
                    {/* Define uma rota para a página "Books" quando o caminho for "/" */}
                    <Route path="/" element={<Books/>}></Route>
                    {/* Define uma rota para a página "Add" quando o caminho for "/add" */}
                    <Route path="/add" element={<Add/>}></Route>
                    {/* Define uma rota para a página "Update" quando o caminho for "/update/:id",
                    onde ":id" é um parâmetro dinâmico que representa o ID do livro a ser atualizado */}
                    <Route path="/update/:id" element={<Update/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
