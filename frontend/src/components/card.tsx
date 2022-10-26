import React from "react";
import styled from "@emotion/styled";

interface Props {
    id: any;
    title: any;
}

const Base = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
`

const Id = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #222;
`

const Content = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #222;
`

const Card: React.FC<Props> = ({ id, title }) => {
    return (
        <Base>
            <Id>{id}</Id>
            <Content>{title}</Content>
        </Base>
    )
}

export default Card;