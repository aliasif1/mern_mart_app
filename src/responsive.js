import {css} from 'styled-components'

export const Mobile = (cssProps) => {
    return css`
    @media only screen and (max-width: 600px){
        ${cssProps}
    }`;
}

export const ExtraSmall = (cssProps) => {
    return css`
    @media only screen and (max-width: 400px){
        ${cssProps}
    }`;
}