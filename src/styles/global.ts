import { createGlobalStyle } from "styled-components"
import {dark, green, white} from 'styles/module/colors'
import bootstrap from 'styles/bootstrap'
import {DEFAULT_TRANSITION} from 'styles/module/variables'
import {darken} from 'polished'

export default createGlobalStyle`
  ${bootstrap};
  
  body {
    background: ${dark};
    color: ${white};
    font-family: 'Hind Siliguri', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }
  
  a {
    color: ${green};
    text-decoration: none;
    ${DEFAULT_TRANSITION};
    &:hover {
      color: ${darken(0.1, green)}
      cursor: pointer;
    }
  }
`
