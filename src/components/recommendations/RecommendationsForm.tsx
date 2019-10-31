import React, {FormEventHandler} from 'react'
import styled, {css} from 'styled-components/macro'
import {motion} from 'framer-motion'
import {useInput} from '@liinkiing/react-hooks'
import AppStore from 'store/AppStore'
import Loader from 'components/ui/Loader'
import {breakpoint} from 'styles/module/mixins'

interface Props {
  readonly onSearch?: (username: string) => void,
  readonly username?: string,
  readonly disabled?: boolean,
}

const RecommendationsFormInner = styled(motion.form)`
  
`

const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: inherit;
  outline: none;
`

const SearchButton = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  transition: all .3s;
  opacity: 1;
  &:hover {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  &:disabled {
    opacity: 0.3;
  }
  img {
    width: 100%;
    height: 100%;
  }
`

const SearchContainer = styled(motion.div)`
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
  box-shadow: 0 17px 16px #0000002b;
  z-index: 1;
  padding: 15px 20px;
  background: whitesmoke;
  border-radius: 3px;
  left: 50%;
  width: 50%;
  display: flex;
  ${SearchInput} {
    flex: 1;
  }
  ${breakpoint('mobile', css`
    width: 90%;
  `)}
`

const RecommendationsForm: React.FC<Props> = ({username, onSearch, disabled}) => {
  const usernameInput = useInput(username)

  const onFormSubmit: FormEventHandler = (e => {
    e.preventDefault()
    onSearch && onSearch(usernameInput.value!)
  })


  return (
    <RecommendationsFormInner
      animate={AppStore.hasSearched ? 'small' : 'large'}
      onSubmit={onFormSubmit}
    >
      <SearchContainer
        initial="large"
        variants={{
          large: {
            position: 'fixed', top: '50%', y: '-50%', x: '-50%', scale: 1
          },
          small: {
            position: 'fixed', top: 20, y: 0, x: '-50%', scale: 0.8
          }
        }}
      >
        <SearchInput
          disabled={disabled}
          placeholder="Entrez un pseudo MyAnimeList..." type="text" {...usernameInput}/>
        {disabled ? <Loader/> : <SearchButton disabled={usernameInput.value!.length === 0 || disabled} type="submit">
          <img src={require('assets/icons/search.svg')} alt=""/>
        </SearchButton>}
      </SearchContainer>
    </RecommendationsFormInner>
  )
}

RecommendationsForm.defaultProps = {
  disabled: false,
  username: ''
}

export default RecommendationsForm
