import {hot} from "react-hot-loader/root"
import {setConfig} from 'react-hot-loader';
import React, {FC} from "react"
import styled from "styled-components/macro"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Index from 'pages/Index'
import About from 'pages/About'
import AnimeDetail from 'pages/anime/AnimeDetail'
import AppStore from 'store/AppStore'
import {observer} from 'mobx-react-lite'

setConfig({
  reloadHooks: true,
});

// const RoutesContainer = posed.div({
//   transition: {duration: 1000},
//   enter: {opacity: 1, zIndex: 1, beforeChildren: true, y: 0 },
//   exit: {opacity: 0, zIndex: -1, y: -10 }
// });

// const PosedRouter: FC = ({children}) => (
//   <Location>
//     {({location}) => (
//       <PoseGroup>
//         <RoutesContainer>
//           <Router location={location}>{children}</Router>
//         </RoutesContainer>
//       </PoseGroup>
//     )}
//   </Location>
// );

const AppInner = styled.div`
  
`

const App: FC = () => {
  return (
    <Router>
      <AppInner>
        <header>
        </header>
        <main>
          <Switch>
            {!AppStore.hasSearched && <Route exact path="/anime/:slug" component={AnimeDetail}/>}
            <Route exact path="/about" component={About}/>
            <Route path="/*" component={Index}/>
          </Switch>
        </main>
      </AppInner>
    </Router>
  );
}

export default hot(
  observer(
    App
  )
)
