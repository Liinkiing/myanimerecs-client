import React from 'react'
import styled from 'styled-components/macro'
import {Switch, Route} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import AppStore from 'store/AppStore'
import Search from 'pages/Search'
import AnimeDetail from 'pages/anime/AnimeDetail'

const IndexInner = styled.div`
  
`

const Index: React.FC = () => {
  const {hasSearched} = AppStore
  return (
    <IndexInner>
      <Switch>
        {!hasSearched && <Route component={AnimeDetail} exact path="/anime/:slug"/>}
        <Route component={Search} path="/*"/>
      </Switch>
    </IndexInner>
  )
}

export default observer(
  Index
)
