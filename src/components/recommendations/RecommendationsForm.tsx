import React, {useCallback, useRef} from 'react'
import styled from 'styled-components/macro'
import {motion} from 'framer-motion'
import {useInput} from '@liinkiing/react-hooks'
import {RecommendationsQuery, useRecommendationsLazyQuery} from 'graphql/components'
import AnimeItem from 'components/anime/AnimeItem'
import AppStore from 'store/AppStore'
import NeutralLink from 'components/ui/NeutralLink'
import {observer} from 'mobx-react-lite'
import Loader from 'components/ui/Loader'

const RecommendationsFormInner = styled(motion.form)`
  
`

const rnd = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const getClassnames = (index: number) => {
  const classes: string[] = []
  if (index % 4 === 0) {
    classes.push('col--row--2x')
  }
  if (index % 9 === 0 && index !== 0) {
    classes.push('col--column--2x')
  }

  return classes
}

const RecommendationsList = React.memo<{ recommendations: RecommendationsQuery['recommendations'] }>(({recommendations}) => {
  return (
    <motion.div
      animate="show"
      className="masonry search-results"
      variants={{
        show: {transition: {staggerChildren: 0.07}}
      }}
    >
      {recommendations.map((recommendation, i) =>
          <div className={getClassnames(i).join(' ') + ' anime'} key={recommendation.malId!}>
            <NeutralLink to={`/anime/${recommendation.slug}`}>
              <AnimeItem
                anime={recommendation}
              />
            </NeutralLink>
          </div>
      )}
    </motion.div>
  )
})


const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: inherit;
  outline: none;
`

const SearchButton = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  transition: all .3s;
  opacity: 1;
  &:hover {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  &:disabled {
    opacity: 0.3;
  }
  img {
    width: 100%;
    height: 100%;
  }
`

const SearchContainer = styled(motion.div)`
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
  box-shadow: 0 17px 16px #0000002b;
  z-index: 1;
  padding: 15px 20px;
  background: whitesmoke;
  border-radius: 3px;
  left: 50%;
  width: 50%;
  display: flex;
  ${SearchInput} {
    flex: 1;
  }
`

const RecommendationsForm: React.FC = () => {
  const username = useInput('')
  const formKey = useRef(rnd())
  const [getRecommendations, {loading, data}] = useRecommendationsLazyQuery()
  const onFormSubmit = useCallback<React.FormEventHandler>(e => {
    e.preventDefault()
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
    getRecommendations({
      variables: {
        username: username.value,
        first: 20
      }
    })
    AppStore.setHasSearched(true)
    formKey.current = rnd()
  }, [username.value, getRecommendations])

  return (
    <RecommendationsFormInner
      animate={AppStore.hasSearched ? 'small' : 'large'}
      onSubmit={onFormSubmit}
    >
      <SearchContainer
        initial="large"
        variants={{
          large: {
            position: 'fixed', top: '50%', y: '-50%', x: '-50%', scale: 1
          },
          small: {
            position: 'fixed', top: 20, y: 0, x: '-50%', scale: 0.8
          }
        }}
      >
        <SearchInput
          disabled={loading}
          placeholder="Entrez un pseudo MyAnimeList..." type="text" {...username}/>
        {loading ? <Loader/> : <SearchButton disabled={username.value.length === 0 || loading} type="submit">
          <img src={require('assets/icons/search.svg')} alt=""/>
        </SearchButton>}
      </SearchContainer>
      {!loading && data && data.recommendations &&
      <RecommendationsList key={formKey.current} recommendations={data.recommendations}/>}
    </RecommendationsFormInner>
  )
}

export default RecommendationsForm
