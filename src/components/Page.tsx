import React, {FunctionComponent} from 'react'
import styled from 'styled-components/macro'

interface Props {
}

const PageInner = styled.div`
`

const Page: FunctionComponent<Props> = ({ children }) => (
  <PageInner>
    {children}
  </PageInner>
)

export default Page
