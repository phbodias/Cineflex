import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Receipt(props){
    const {session, movie, client} = props

    const cpf = client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return (
        <Content>
            <Sucess>
                <div>Pedido feito</div>
                <div>com sucesso!</div>
            </Sucess>
            <Infos>
                <div>Filme e sessão</div>
                <p>{movie.movieName}</p>
                <p>{session.day.date} {session.time}</p>
                <div>Ingressos</div>
                {session.ids.map(s => (
                    <p>Assento {s - session.id0 + 1}</p>
                ))}
                <div>Comprador</div>
                <p>Nome: {client.nameClient}</p>
                <p>CPF: {cpf}</p>
            </Infos>
            <StyledLink to={`/`}>
                <Button>
                    Voltar pra Home
                </Button>
            </StyledLink>

        </Content>
    )
}

const Infos = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    letter-spacing: 0.04em;
    color: #293845;

    div {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        margin-top: 45px;
    }

    div: first-child{
        margin-top: 0;
    }

    p {
        heigth: 25px;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        color: #293845;
    }
`

const Sucess = styled.div`
    height: 110px; 
    font-weight: 700;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #247A6B;
    padding: 35px 0;
    box-sizing: border-box;

    div {
        height: 25px;
    }
`

const Button = styled.div`
    margin-top: 70px;
    margin-bottom: 30px;
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
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
`