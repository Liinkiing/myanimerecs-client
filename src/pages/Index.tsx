import React from 'react'
import styled from 'styled-components/macro'
import {Tab} from '@liinkiing/react-tabs'
import {motion} from 'framer-motion'
import RecommendationsForm from 'components/recommendations/RecommendationsForm'
import {Router} from '@reach/router'
import Route from 'components/Route'
import {observer} from 'mobx-react-lite'
import AppStore from 'store/AppStore'
import AnimeDetail from 'pages/anime/AnimeDetail'

const IndexInner = styled.div`
  
`

styled(motion.div)`
  width: 120px;
  height: 120px;
  background: whitesmoke;
  border-radius: 20px;

`

styled(motion.div)`
  padding: 20px;
  display: flex;
  overflow: hidden;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
  }
`

styled(Tab.Title)`
  background: red;
`


const Index: React.FC = () => {
  const {hasSearched} = AppStore
  return (
    <IndexInner>
      <h1>Je suis la homepage</h1>
      <Router>
        {hasSearched && <Route component={RecommendationsForm} path="/anime/:slug"/>}
        <Route component={RecommendationsForm} path="/"/>
      </Router>
    </IndexInner>
  )
}

export default observer(
  Index
)
