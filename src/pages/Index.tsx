import React from 'react'
import styled from 'styled-components/macro'
import RecommendationsForm from 'components/recommendations/RecommendationsForm'

const IndexInner = styled.div`
  
`

const Index: React.FC = () => {

  return (
    <IndexInner>
      <h1>Je suis la homepage</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RecommendationsForm/>
      </React.Suspense>
    </IndexInner>
  )
}

export default Index
