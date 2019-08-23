import React from 'react'
import styled from 'styled-components/macro'
import {useInput} from '@liinkiing/react-hooks'
import {useRecommendationsQuery} from 'graphql/components'

const RecommendationsFormInner = styled.form`
  
`

const RecommendationsForm: React.FC = () => {
  const username = useInput('')
  const recommendations = useRecommendationsQuery({
    skip: username.value === '',
    variables: { username: username.value }
  })

  return (
    <RecommendationsFormInner>
      <h2>Jui le formulaire</h2>
      <input type="text" {...username}/>
    </RecommendationsFormInner>
  )
}

export default RecommendationsForm
