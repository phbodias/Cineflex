import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import Loading from './Loading';
import Footer from './Footer';

export default function Seats(props){
    const {setSession, setMovie, setClient} = props;
    const [seats, setSeats] = useState([]);
    const { idSession } = useParams();
    
    const { movie, day, name: hora } = seats;
    const { seats: options } = seats;

    const [selected, setSelected] = useState([false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false,false, false, false, false, false]);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [ids, setIds] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);

        promise.then(response => {
            setSeats(response.data);
        });
    }, [idSession]);

    if (seats.length === 0) {
        return (
            <Content>
                <Loading />
            </Content>
        );
    }

    const postar = {
        name, 
        cpf, 
        ids,
    }

    function selection(available, index){
        if (!available){
            return alert("Esse assento não está disponível");
        }
        else{
            setSelected(selected.map((s, i) => (
                i === index ? !selected[i] : selected[i]
            )));
            if (!selected[index]){
                setIds([...ids, options[index].id]);
            }else{
                setIds(ids.filter((s, i) =>  ids[i] !== options[index].id));
            }
        }
    }

    function setar(){
        console.log("BEEEEERRRRR", name, cpf, movie.title, ids, day, hora);
        setClient({
            nameClient: name,
            cpf: cpf,
        })

        setMovie({
            movieName: movie.title
        })

        setSession({
            id0: options[0].id,
            ids: ids,
            day: day,
            time: hora
        })
    }

    function Post(){
        setar();
        axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, postar);
    }
    
    return (
        <>  
            <Content>
                <p>Selecione o(s) assento(s)</p>
                <OptionsStyled>
                    {options.map((option, index) => (
                        <Option available={option.isAvailable} onClick={() => selection(option.isAvailable, index)}  value={selected[index]}>{option.name}</Option>
                    ))}
                </OptionsStyled>
                <Legenda>
                    <div>
                        <h2></h2>
                        <h3></h3>
                        <h4></h4>
                    </div>
                    <div>
                        <h1>Selecionado</h1>
                        <h1>Disponível</h1>
                        <h1>Indisponível</h1>
                    </div>
                </Legenda>
                <Dados>
                    <div>
                        <div>
                            <p>
                                Nome do comprador:
                            </p>
                            <input type="text" placeholder='Digite seu nome...' value={name} onChange={e => setName(`${e.target.value}`)}/>
                        </div>
                        <div>
                            <p>
                                CPF do comprador:
                            </p>
                            <input type="text" placeholder='Digite seu CPF...' value={cpf} maxLength={11} onChange={e => setCPF(`${e.target.value}`)}/>
                        </div>
                    </div>
                </Dados>
                 {(cpf.length === 11 && name.length > 0 && ids.length > 0)
                    ? <StyledLink to={`/receipt`}>
                        <Button able={true} onClick={Post}>
                            Reservar assento(s)
                        </Button>
                    </StyledLink>
                    : <Button able={false}>
                        Reservar assento(s)
                    </Button>
                }
                <Footer title={movie.title} posterURL={movie.posterURL} day={day.weekday} hour={hora}/>
            </Content>
        </>
    )
}

const Button = styled.div`
    margin-bottom: 30px;
    width: 225px;
    height: 42px;
    background: ${props => props.able ? '#E8833A' : '#E5E5E5'};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
`

const Dados = styled.div`
    width: calc(100% - 48px);
    max-width: 1000px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 57px;
    
    div p{
        height: 25px;
        font-size: 18px;
    }

    input{
        width: 327px;
        height: 51px;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
    }
`

const Legenda = styled.div`

    h1{
        margin-bottom: 42px;
    }
    
    h2{
        width: 25px;
        height: 25px;
        background: #8DD7CF;
        border: 1px solid #1AAE9E;
        border-radius: 17px;
    }
    
    h3{
        width: 25px;
        height: 25px;
        background: #C3CFD9;
        border: 1px solid #7B8B99;
        border-radius: 17px;
    }

    h4{
        width: 25px;
        height: 25px;
        background: #FBE192;
        border: 1px solid #F7C52B;
        border-radius: 17px;
    }

    div {
        width: 70vw;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
`

const OptionsStyled = styled.div`
    width: calc(100% - 48px);
    max-width: 1000px;
    height: 205px;
    display: flex;
    flex-direction: inline;
    flex-wrap: wrap;
    justify-content: space-evenly;
    box-sizing: border-box;
    font-size: 11px;    
`

const Option = styled.div`
    width: 9%;
    height: 9%;
    color: #293845;
    font-size: 20px;
    justify-content: flex-start;
    background-color: ${props => props.available ? (props.value ? '#8DD7CF' : '#C3CFD9') : '#FBE192'};
    border: 1px solid #808F9D;
    border-radius: 50px;
    text-align: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 117px;

    p{
        height: 110px;
        text-align: center;
        display: flex;
        align-items: center;
        font-size: 24px;
    }
`