import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';


export default function NewIncident() {

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        
        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        };

        try {
            
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                } 
            });

            history.push('/profile');

        } catch (error) {
            alert("Falha ao cadastrar incidente, tente novamente");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />Voltar para Home
                   </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value) }
                        placeholder="Título do caso"
                    />
                    
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value) }
                        placeholder="Descrição"
                    />
                    
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value) }
                        placeholder="Valor em reais"
                    />
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
