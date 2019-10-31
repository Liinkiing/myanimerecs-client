import React, {useEffect, useRef} from 'react'
import styled from 'styled-components/macro'
import RecommendationsForm from 'components/recommendations/RecommendationsForm'
import {useRecommendationsLazyQuery} from 'graphql/components'
import AppStore from 'store/AppStore'
import RecommendationsList from 'components/recommendations/RecommendationsList'
import {useHistory, useLocation} from 'react-router-dom'

const SearchInner = styled.div`
  
`

const Search: React.FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const params = useRef<{ query: string }>({ query: '' })
  const [getRecommendations, {fetchMore, loading, data}] = useRecommendationsLazyQuery({
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('q')
    if (query) {
      params.current.query = query
      getRecommendations({
        variables: {
          username: query,
          offset: 0,
          limit: 20
        }
      })
      AppStore.setHasSearched(true)
    }
  }, [getRecommendations, search])

  const onSearch = (username: string) => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
    getRecommendations({
      variables: {
        username,
        offset: 0,
        limit: 20
      }
    })
    history.push(`/?q=${username}`)
    AppStore.setHasSearched(true)
  }

  const onLoadMore = () => {
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
  }

  return (
    <SearchInner>
      <RecommendationsForm username={params.current.query} onSearch={onSearch} disabled={loading}/>
      <RecommendationsList recommendations={data && data.recommendations ? data.recommendations : []} onLoadMore={onLoadMore}/>
    </SearchInner>
  )
}

export default Search
