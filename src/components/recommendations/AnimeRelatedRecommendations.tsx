import React from 'react'
import styled from 'styled-components/macro'
import {AnimeRelatedRecommendations_RelatedFragment} from 'graphql/components'

interface Props {
  related: ReadonlyArray<AnimeRelatedRecommendations_RelatedFragment>
}

const scaleCeil = (num: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return Math.ceil((num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}

const AnimeRelatedRecommendationsInner = styled.div`
  padding: 10px;
  background: rgba(245,245,245,0.24);
  margin-top: auto;
`

const AnimeRelatedList = styled.ul`
  font-size: 10px;
`

const AnimeRelatedRecommendations: React.FC<Props> = React.memo(({ related }) => {
  const getRecommendationWeight = (recommendation: AnimeRelatedRecommendations_RelatedFragment): string => {
    const length = scaleCeil(recommendation.score, 0, 100, 1, 4)
    return new Array<string>(length).fill('+').join('')
  }

  return (
    <AnimeRelatedRecommendationsInner>
      <AnimeRelatedList>
        {related.map((recommendation, i) =>
          <li key={i}>
            {getRecommendationWeight(recommendation)} {recommendation.anime.title.english}
          </li>
        )}
      </AnimeRelatedList>
    </AnimeRelatedRecommendationsInner>
  )
})

export default AnimeRelatedRecommendations
