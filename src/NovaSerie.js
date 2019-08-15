import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const NovaSerie = () => {

    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);

    const onChange = event => {
        setName(event.target.value);
    }

    const save = () => {
        axios
            .post("/api/series", {
                name
            })
            .then(res => {
                setSuccess(true);
            });
    }

    if (success) {
        return <Redirect to="/series" />
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da série" />
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                <Link to="/series" className="btn btn-default">Voltar</Link>
            </form>
        </div>
    )
}
                
export default NovaSerie;