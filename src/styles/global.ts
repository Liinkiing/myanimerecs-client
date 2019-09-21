import {createGlobalStyle, css} from "styled-components"
import {dark, green, white} from 'styles/module/colors'
import bootstrap from 'styles/bootstrap'
import {DEFAULT_TRANSITION} from 'styles/module/variables'
import {darken} from 'polished'
import {breakpoint, customScrollbar} from 'styles/module/mixins'

export default createGlobalStyle`
  ${bootstrap};
  
  * {
    box-sizing: border-box;
  }
  
  body {
    background: ${dark};
    color: ${white};
    font-family: 'Hind Siliguri', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    &.overflow {
      overflow: hidden;
      height: 100vh;
    }
    ${customScrollbar};
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
  
  .masonry {
    padding: 20px;
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat( auto-fill, minmax( 200px, 1fr ) );
    grid-auto-rows: 250px;
    ${breakpoint('mobile', css`
      grid-template-columns: 100%;
    `)}
  }
  .search-results {
    padding-top: 120px;
  }
  .col--row--2x {
     grid-row-end: span 2;
  }
  .col--row--3x {
     grid-row-end: span 3;
  }
  .col--column--2x {
     grid-column-end: span 2;
     ${breakpoint('mobile', css`
        grid-column-end: span 1;
    `)}
  }
  .col--column--3x {
     grid-column-end: span 3;
     ${breakpoint('mobile', css`
        grid-column-end: span 1;
    `)}
  }
`
