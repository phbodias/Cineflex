import styled from 'styled-components';

import loading from '../assets/loading.gif'

export default function Loading(){
    return(
        <LoadingStyle>
            <img src={loading} alt="Loading"/>
        </LoadingStyle>
    )
}

const LoadingStyle = styled.div`
    margin-top: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`