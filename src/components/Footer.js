import styled from 'styled-components';


export default function Footer({ title, posterURL, day, hour }){
    return (
        <FooterStyle>
            <img src={posterURL} alt={title}/>
            <div>
                <p>{title}</p>
                {day !== undefined &&
                    <p>{day} - {hour}</p>
                }
            </div>
        </FooterStyle>
    )
}

const FooterStyle = styled.div`
    width: 100%;
    height: 117px;
    background-color: #9EADBA;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;

    img {
        width: 48px;
        height: 72px;
        margin: 0 24px;
        background-color: #FFFFFF;
        box-shadow: 0px 2px 4px 2px rgba(255, 255, 255, 0.8);
    }

    div {
        height: 117px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    div p {
        height: 32px;
        font-size: 26px;
        color: #293845;
    }

`