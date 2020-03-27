import React, { useState, useEffect} from 'react'; // useEffect dispara função em algum determinaod momento do componente html
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'; 

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
  
  const [incidents, setincidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName'); //Busca nome de ong enviado no /logon/index.js para o storage

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response =>{
      setincidents(response.data);
    })
  }, [ongId]);

  
  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setincidents(incidents.filter(incident => incident.id !== id)); //filtra somente os itens com id não excluida
    }catch(err){
      alert('Erro ao deletar caso1;')
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/')
  }

  return(
      <div className="profile-container">
          <header>
            <img src={logoImg} alt="BeTheHero"/>
            <span>Bem Vindo, {ongName}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button"><FiPower size={18} color="#E02041"/></button>
          </header>

          <h1>Casos Cadastrados</h1>

          <ul>
              {incidents.map(incident => (
                <li key={incident.id}>
                  <strong>CASO:</strong>
                  <p>{incident.title}</p>
                
                  <strong>DESCRIÇÃO:</strong>
                  <p>{incident.description}</p>

                  <strong>VALOR:</strong>
                  <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                  <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
                </li>
              )) /** Map percorre itens cadastrados */} 
          </ul>
      </div>
  );
}