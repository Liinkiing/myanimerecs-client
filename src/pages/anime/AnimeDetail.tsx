import React from 'react'
import styled from 'styled-components/macro'
import {RouteComponentProps} from 'react-router-dom'
import {useAnimeDetailQuery} from 'graphql/components'

const AnimeDetailInner = styled.div`
  
`

interface Props extends RouteComponentProps<{ slug: string }> {
}

const AnimeDetail: React.FC<Props> = ({match}) => {
  const {data, loading} = useAnimeDetailQuery({
    variables: {slug: match.params.slug!}
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (data && data.anime) {
    console.log(data)
    return (
      <AnimeDetailInner>
      </AnimeDetailInner>
    )
  }
  return <div>Error</div>
}

export default AnimeDetail
