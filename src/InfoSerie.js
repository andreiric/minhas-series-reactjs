import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {

    const [form, setForm] = useState({});
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState("INFO");
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState('');

    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`/api/series/${match.params.id}`)
            .then(res => {
                setData(res.data);
                setForm(res.data);
            })
        
    }, [match.params.id]);

    useEffect(() => {
        axios
        .get("/api/genres")
        .then(res => {
            setGenres(res.data.data);
            const genres = res.data.data;
            const encontrado = genres.find(value => data.genre === value.name);
            if (encontrado) {
                setGenreId(encontrado.id);
            }
        })    
    }, [data]);

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        // backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => event => {
        setForm({
            ...form,
            [field]: event.target.value
        });
    }

    const onChangeGenre = event => {
        setGenreId(event.target.value);        
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        });
    }

    const save = () => {
        axios
            .put("/api/series/" + match.params.id, {
                ...form,
                genre_id: genreId
            })
            .then(res => {
                setSuccess(true);
            });
    }

    if (success) {
        return <Redirect to="/series" />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{ background: 'rgba(0, 0, 0, 0.7)'}}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img  alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />    
                            </div>
                            <div className="col-8">
                                <h1 className="font-weight-light text-white">{data.name}</h1>
                                <div className="lead text-white">
                                    { data.status === "ASSISTIDO" && <Badge color="success">Assistido</Badge> }
                                    { data.status === "PARA_ASSISTIR" && <Badge color="warning">Para assistir</Badge> }
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <button onClick={() => setMode("EDIT")}>Editar</button>
            </div>
            { 
                mode === "INFO" && 
                <div className="container">
                <h1>Edição da Série</h1>
                <pre>{JSON.stringify(form)}</pre>
                <form>  
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input type="text" value={form.name} onChange={onChange("name")} className="form-control" id="name" placeholder="Nome da série" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comentários</label>
                        <input type="text" value={form.comments} onChange={onChange("comments")} className="form-control" id="comments" placeholder="Comentário da série" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Gênero</label>
                        <select className="form-control" onChange={onChangeGenre} value={genreId}>
                            { genres.map(genre => <option key={genre.id} value={genre.id} selected={genre.id === genreId}>{genre.name}</option>) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input" type="radio" name="status" id="assistido" value="ASSISTIDO" checked={form.status === "ASSISTIDO"} onClick={seleciona("ASSISTIDO")} />
                            <label className="custom-control-label" htmlFor="assistido">Assistido</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className="custom-control-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" checked={form.status === "PARA_ASSISTIR"} onClick={seleciona("PARA_ASSISTIR")} />
                            <label className="custom-control-label" htmlFor="paraAssistir">Para assistir</label>
                        </div>
                    </div>
                    <button type="button" onClick={() => save()} className="btn btn-primary">Salvar</button>
                    <button onClick={() => setMode("INFO")} className="btn btn-secondary">Cancelar Edição</button>    
                </form>
            </div>
            }
        </div>
    )
}
                
export default InfoSerie;