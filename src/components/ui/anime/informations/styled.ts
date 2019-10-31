import styled from 'styled-components/macro'

export const AnimeInformationsInner = styled.div`
  padding: 20px;
  background: #9287F5;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.16);
  color: whitesmoke;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 28px;
  max-width: 400px;
`

export const AnimeInformationsList = styled.ul`
  display: flex;
  justify-content: center;
  & > li:not(:last-of-type) {
    padding-right: 8px;
  }
  & > li + li {
    position: relative;
    //border-left: 1px solid whitesmoke;
    padding-left: 8px;
    &::before {
      content: '';
      position:absolute;
      height: 100%;
      width: 1px;
      background: whitesmoke;
      left: 0;
      transform: scaleY(0.3);
    }
  }
`

export const AnimeInformationsSub = styled.sub`
  font-size: 16px;
  margin-left: 4px;
`
