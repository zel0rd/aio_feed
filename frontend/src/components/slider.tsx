import React from "react";
import ReactSlick, {Settings} from "react-slick";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ArrowButton = styled.button<{ pos?:'left' | 'right'}>`
padding: 16px;
background-color: rgba(0, 0, 0, 0.1);
border-radius: 50%;
z-index: 1;
top: 50%;
background-color: #fff;
${({pos}) => pos === 'left' ? css`left:0; transform: translate(-50%, -50%)` : css`right:0; transform: translate(50%, -50%)`}}))
&:before {
    content: initial;
}
> svg {
    poition: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    color: #222;
`;

const DEFAULT_SETTINGS: Settings = {
    dots: false,
    arrows: true, 
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipe: true,
    draggable: true,
    prevArrow: (
        <ArrowButton>
            <MdArrowBackIos />
        </ArrowButton>
    ),
    nextArrow: (
        <ArrowButton>
            <MdArrowForwardIos />
        </ArrowButton>
    )

}

interface Props {
    setting?: Settings;
}

const Slider: React.FC = (settings = DEFAULT_SETTINGS, children) => {
    return (
        <ReactSlick {...settings}>
            {children}
        </ReactSlick>
    )
}

export default Slider