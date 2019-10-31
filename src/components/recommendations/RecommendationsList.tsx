import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component';
import {RecommendationsQuery} from 'graphql/components'
import AnimeItem from 'components/anime/item'
import {useHistory, useLocation} from 'react-router-dom'

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
  readonly recommendations: RecommendationsQuery['recommendations'],
  readonly onLoadMore?: () => void,
}

const RecommendationListGridItem = styled.div.attrs<{ className: string }>({
  className: 'anime'
})`
  border-radius: 12px;
  overflow: hidden;
`

const RecommendationsList: React.FC<RecommendationListProps> = ({recommendations, onLoadMore}) => {
  const {pathname} = useLocation()
  const history = useHistory()

  return (
    <InfiniteScroll
      dataLength={recommendations.length}
      next={onLoadMore ? onLoadMore : () => {
      }}
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
              onBack={() => {
                history.push('/')
              }}
              onSelect={() => {
                history.push(`/anime/${recommendation.slug}`)
              }}
              isSelected={pathname.includes(recommendation.slug)}
              anime={recommendation}
            />
          </div>
        )}
      </motion.div>
    </InfiniteScroll>
  )
}

export default RecommendationsList
