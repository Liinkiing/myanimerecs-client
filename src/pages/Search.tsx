import React from 'react'
import styled from 'styled-components/macro'
import RecommendationsForm from 'components/recommendations/RecommendationsForm'
import {useRecommendationsLazyQuery} from 'graphql/components'
import AppStore from 'store/AppStore'
import RecommendationsList from 'components/recommendations/RecommendationsList'

const SearchInner = styled.div`
  
`

const Search: React.FC = () => {
  const [getRecommendations, {fetchMore, loading, data, networkStatus}] = useRecommendationsLazyQuery({
    notifyOnNetworkStatusChange: true
  })

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
      <RecommendationsForm onSearch={onSearch} disabled={loading}/>
      <RecommendationsList recommendations={data && data.recommendations || []} onLoadMore={onLoadMore}/>
    </SearchInner>
  )
}

export default Search
