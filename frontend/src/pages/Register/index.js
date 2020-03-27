import React, { useState } from 'react'; //useState pega valores do formulário
import { Link, useHistory } from 'react-router-dom'; //compotamento SPA, não recarrega todo react ao trafegar por paginas
import { FiArrowLeft } from 'react-icons/fi'; //importa icones do FeatherIcons

import api from '../../services/api';//importa arquivo que chama api do backend
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Register(){

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){ 
        e.preventDefault(); //previne comportamento nativo da pagina que após da um submit recarrega
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };     

       // console.log(data.JSONparse());
        

        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/')
        }catch(err){
            alert(`Erro no Cadastro, tente novamente`);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    
                    <img src={logoImg} alt="BeTheHero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/"> 
                        < FiArrowLeft size={16} color="E02141"/> 
                        Não tenho Cadastro
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    
                    <input 
                        placeholder="Nome da ONG"
                        value={name} //chama variavel da função
                        onChange={e => setName(e.target.value)} //"escuta"/recebe alterações e armazena valores no estado(state)
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email} //chama variavel da função
                        onChange={e => setEmail(e.target.value)} //"escuta"/recebe alterações e armazena valores no estado(state)
                    />
                    
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp} //chama variavel da função
                        onChange={e => setWhatsapp(e.target.value)} //"escuta"/recebe alterações e armazena valores no estado(state)
                    />
                    
                    <div className="input-group">

                        <input 
                            placeholder="Cidade"
                            value={city} //chama variavel da função
                            onChange={e => setCity(e.target.value)} //"escuta"/recebe alterações e armazena valores no estado(state)
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf} //chama variavel da função
                            onChange={e => setUf(e.target.value)} //"escuta"/recebe alterações e armazena valores no estado(state)
                        />
                    
                    </div>
                    
                    <button className="button" type="submit">Cadastrar</button>
                
                </form>
            </div>
        </div>
    );

}