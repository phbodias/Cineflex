import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <HeaderStyle>
            <StyledLink to={`/`}>
                <p>CINEFLEX</p>
            </StyledLink>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    height: 67px;
    background-color: #C3CFD9;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
	
	p {
        font-size: 34px;
		color: #E8833A;
        text-decoration: none;
	}
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;




