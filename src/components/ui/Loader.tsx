import React from 'react'
import styled, {css} from 'styled-components/macro'

interface Props {
  withBackground?: boolean,
  inverted?: boolean,
}

const LoaderInner = styled.div<Pick<Props, 'withBackground'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  & > svg {
    width: 100%;
    height: 100%;
  }
  ${props => props.withBackground && css`
    background: rgba(0,0,0,0.35);
    border-radius: 3px;
    padding: 5px;
  `}
`

const Loader: React.FC<Props> = ({withBackground, inverted}) => {
  const color = inverted ? '#000' : '#fff'

  return (
    <LoaderInner withBackground={withBackground}>
      <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" className="loader-icon">
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stopColor={color} stopOpacity="0" offset="0%"/>
            <stop stopColor={color} stopOpacity=".631" offset="63.146%"/>
            <stop stopColor={color} offset="100%"/>
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"/>
            </path>
            <circle fill={color} cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"/>
            </circle>
          </g>
        </g>
      </svg>
    </LoaderInner>
  )
}

Loader.defaultProps = {
  withBackground: false,
  inverted: true
}

export default Loader
