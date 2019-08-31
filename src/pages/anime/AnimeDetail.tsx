import React from 'react'
import styled from 'styled-components/macro'
import {RouteComponentProps} from '@reach/router'
import {useAnimeDetailQuery} from 'graphql/components'
import {AnimeItemDetail} from 'components/anime/AnimeItem'

const AnimeDetailInner = styled.div`
  
`

interface Props extends RouteComponentProps<{ slug: string }> {
}

const AnimeDetail: React.FC<Props> = ({slug}) => {
  const {data, loading} = useAnimeDetailQuery({
    variables: {slug: slug!}
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (data && data.anime) {
    console.log(data)
    return (
      <AnimeDetailInner>
        <AnimeItemDetail anime={data.anime}/>
      </AnimeDetailInner>
    )
  }
  return <div>Error</div>
}

export default AnimeDetail
