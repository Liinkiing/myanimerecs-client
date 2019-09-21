import React from 'react';
import {Anime} from 'graphql/components'
import {AnimeInformationsSub, AnimeInformationsInner, AnimeInformationsList} from './styled'

interface Props {
  readonly anime: Pick<Anime, 'episodesCount' | 'duration'>
}

const AnimeInformations: React.FC<Props> = ({ anime })  => (
  <AnimeInformationsInner>
    <AnimeInformationsList>
      <li>
        {anime.episodesCount}
        <AnimeInformationsSub>ep</AnimeInformationsSub>
      </li>
      <li>
        {parseInt(anime.duration || '20')}
        <AnimeInformationsSub>min</AnimeInformationsSub>
      </li>
    </AnimeInformationsList>
  </AnimeInformationsInner>
)

export default AnimeInformations
