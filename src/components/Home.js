import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Loading from './Loading';


export default function Home(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise.then(response => {
            setMovies(response.data);
        });
    }, [])

    if (movies.length === 0) {
        return (
            <Content>
                <Loading />
            </Content>
        );
    }


    return(
        <Content>
            <p>Selecione o filme</p>
            <Images>
                {movies.map(movie => (
                    <Link to={`/sessions/${movie.id}`}>
                        <img src={movie.posterURL} alt={movie.title} />
                    </Link>
                ))}
            </Images>
        </Content>
    )
}


const Images = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    

    img {
        margin-bottom: 27px;
        width: 129px;
        height: 193px;
        background-color: #FFFFFF;
        box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.3);
    }

    img:hover{
        box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.8);
    }
`

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    p{
        height: 110px;
        text-align: center;
        display: flex;
        align-items: center;
        font-size: 24px;
    }
`

