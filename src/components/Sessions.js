import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import Loading from './Loading';
import Footer from './Footer';

export default function Sessions(){
    const [movie, setMovie] = useState([]);
    const { idMovie } = useParams();

    const { days } = movie;
    

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);

        promise.then(response => {
            setMovie(response.data);
        });
    }, [idMovie]);

    if (movie.length === 0) {
        return (
            <Content>
                <Loading />
            </Content>
        );
    }
    
    return (
       <>
        <Content>
            <p>Selecione o horário</p>
            {days.map(session => (
                <SessionsStyled>
                    <h1>{session.weekday} - {session.date}</h1>

                    <div>
                        {session.showtimes.map(session =>
                            <StyledLink to={`/seats/${session.id}`}>
                                <p>{session.name}</p>
                            </StyledLink>
                        )}
                    </div>
                </SessionsStyled>
            ))}
            <Footer title={movie.title} posterURL={movie.posterURL}/>
        </Content>
       </>
    )
}

const SessionsStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    box-sizing: border-box;

    h1 {
        color: #293845;
        font-size: 20px;
        justify-content: flex-start;
        margin-bottom: 22px;
    }    

    div {
        display: flex;
    }

    div p{
        width: 83px;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        font-weight: 300;    
        font-size: 18px;
        color: #fff;
        border-radius: 3px;
        background-color: #e8833a;
        margin-right: 8px;
        margin-bottom: 22px;
    }

    div p:hover{
        background-color: red;
    }
`

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
const StyledLink = styled(Link)`
    text-decoration: none;
`;