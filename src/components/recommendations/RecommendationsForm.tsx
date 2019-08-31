import React, {useCallback, useRef} from 'react'
import styled from 'styled-components/macro'
import {motion} from 'framer-motion'
import {useInput} from '@liinkiing/react-hooks'
import {RecommendationsQuery, useRecommendationsLazyQuery} from 'graphql/components'
import AnimeItem from 'components/anime/AnimeItem'
import {Link} from '@reach/router'
import AppStore from 'store/AppStore'

const RecommendationsFormInner = styled.form`
  
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
      className="masonry"
      variants={{
        show: {transition: {staggerChildren: 0.07}}
      }}
    >
      {recommendations.map((recommendation, i) =>
          <div className={getClassnames(i).join(' ') + ' anime'} key={recommendation.malId!}>
            <Link to={`/anime/${recommendation.slug}`}>
              <AnimeItem
                anime={recommendation}
              />
            </Link>
          </div>
      )}
    </motion.div>
  )
})

const RecommendationsForm: React.FC = () => {
  const username = useInput('')
  const formKey = useRef(rnd())
  const [getRecommendations, {loading, data}] = useRecommendationsLazyQuery()
  const onFormSubmit = useCallback<React.FormEventHandler>(e => {
    e.preventDefault()
    getRecommendations({
      variables: {
        username: username.value,
        first: 20
      }
    })
    AppStore.setHasSearched(true)
    formKey.current = rnd()
  }, [username.value, getRecommendations])
  if (loading) return <div>Loading...</div>
  return (
    <RecommendationsFormInner onSubmit={onFormSubmit}>
      <h2>Jui le formulaire</h2>
      <input type="text" {...username}/>
      <button type="submit">Submit</button>
      {data && data.recommendations &&
      <RecommendationsList key={formKey.current} recommendations={data.recommendations}/>}
    </RecommendationsFormInner>
  )
}

export default RecommendationsForm
