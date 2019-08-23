import React from 'react'
import styled from 'styled-components/macro'
import {Link} from '@reach/router'

const AppNavInner = styled.nav`
  
`

const AppNav: React.FC = () => {

  return (
    <AppNavInner>
      <h2>Je suis la navigation</h2>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </AppNavInner>
  )
}

export default AppNav
