import {hot} from "react-hot-loader/root"
import {setConfig} from 'react-hot-loader';
import React, {FC} from "react"
import styled from "styled-components/macro"
import posed, {PoseGroup} from 'react-pose'
import {Location, Router} from '@reach/router'
import Index from 'pages/Index'
import Route from 'components/Route'
import About from 'pages/About'
import AppNav from 'components/ui/AppNav'
import AnimeDetail from 'pages/anime/AnimeDetail'
import AppStore from 'store/AppStore'
import {observer} from 'mobx-react-lite'

setConfig({
  reloadHooks: true,
});

const RoutesContainer = posed.div({
  transition: {duration: 1000},
  enter: {opacity: 1, zIndex: 1, beforeChildren: true, y: 0 },
  exit: {opacity: 0, zIndex: -1, y: -10 }
});

const PosedRouter: FC = ({children}) => (
  <Location>
    {({location}) => (
      <PoseGroup>
        <RoutesContainer>
          <Router location={location}>{children}</Router>
        </RoutesContainer>
      </PoseGroup>
    )}
  </Location>
);

const AppInner = styled.div`
  
`

const App: FC = () => {
  return (
    <AppInner>
      <header>
        {/*<AppNav/>*/}
      </header>
      <main>
        <Router>
          {!AppStore.hasSearched && <Route component={AnimeDetail} path="/anime/:slug"/>}
          <Route component={Index} path="/*"/>
          <Route component={About} path="/about"/>
        </Router>
      </main>
    </AppInner>
  );
}

export default hot(
  observer(
    App
  )
)
