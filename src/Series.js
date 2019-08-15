import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Series = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data);
            })
    }, []);

    const deleteGenero = id => {
        axios
            .delete("/api/series/" + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id);
                setData(filtrado);                
            });
    }

    const renderizarLinha = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteGenero(record.id)}>Remover</button>
                    <Link to={"/series/" + record.id} className="btn btn-warning">Editar</Link>
                </td>
            </tr>
        )
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Séries</h1>
                <div><Link to="/series/novo" className="btn btn-primary">Nova Série</Link></div>
                <div className="alert alert-warning" role="alert">
                    Você não possui séries criadas
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <div><Link to="/series/novo" className="btn btn-primary">Nova Série</Link></div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizarLinha)}
                </tbody>
            </table>
            <pre>{JSON.stringify(data.data)}</pre>
        </div>
    );
}

export default Series;