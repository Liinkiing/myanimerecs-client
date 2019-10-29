import React, {useCallback} from 'react'
import styled, {css} from 'styled-components/macro'
import {motion} from 'framer-motion'
import {useInput} from '@liinkiing/react-hooks'
import {RecommendationsQuery, useRecommendationsLazyQuery} from 'graphql/components'
import AnimeItem from 'components/anime/item'
import AppStore from 'store/AppStore'
import Loader from 'components/ui/Loader'
import {breakpoint} from 'styles/module/mixins'
import useHistoryLocation from 'hooks/useHistoryLocation'
import InfiniteScroll from 'react-infinite-scroll-component';

const RecommendationsFormInner = styled(motion.form)`
  
`

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

interface RecommendationListProps {
  recommendations: RecommendationsQuery['recommendations'],
  onLoadMore: () => void,
}

const RecommendationListGridItem = styled.div.attrs<{ className: string }>({
  className: 'anime'
})`
  border-radius: 12px;
  overflow: hidden;
`

const RecommendationsList = React.memo<RecommendationListProps>(({recommendations, onLoadMore}) => {
  const { href } = useHistoryLocation()

  return (
    <InfiniteScroll
      dataLength={recommendations.length}
      next={onLoadMore}
      scrollThreshold={0.65}
      hasMore={true}
      loader={<></>}
    >
      <motion.div
        animate="show"
        className="masonry search-results"
        variants={{
          show: {transition: {staggerChildren: 0.07}}
        }}
      >

        {recommendations.map((recommendation, i) =>
          <div className={getClassnames(i).join(' ') + ' anime'} key={recommendation.malId!}>
            <AnimeItem
              isSelected={href.includes(recommendation.slug)}
              anime={recommendation}
            />
          </div>
        )}
      </motion.div>
    </InfiniteScroll>
  )
}, (prevProps, nextProps) => prevProps.recommendations.length === nextProps.recommendations.length)


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
  ${breakpoint('mobile', css`
    width: 90%;
  `)}
`

const RecommendationsForm: React.FC = () => {
  const username = useInput('')
  const [getRecommendations, {fetchMore, loading, data}] = useRecommendationsLazyQuery({
    notifyOnNetworkStatusChange: true
  })
  const onFormSubmit = useCallback<React.FormEventHandler>(e => {
    e.preventDefault()
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
    getRecommendations({
      variables: {
        username: username.value,
        offset: 0,
        limit: 20
      }
    })
    AppStore.setHasSearched(true)
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
      <RecommendationsList
        onLoadMore={() => {
          fetchMore({
            variables: {
              offset: data && data.recommendations ? data.recommendations.length : 0
            },
            updateQuery: (prev, {fetchMoreResult}) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                recommendations: [...prev.recommendations, ...fetchMoreResult.recommendations]
              });
            }
          })
        }}
        recommendations={data && data.recommendations || []}/> : <div/>
    </RecommendationsFormInner>
  )
}

export default RecommendationsForm
