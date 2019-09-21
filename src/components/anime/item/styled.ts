import styled, {css} from 'styled-components'
import NeutralLink from 'components/ui/NeutralLink'
import {motion} from 'framer-motion'
import {breakpoint} from 'styles/module/mixins'

export const GoToAnimeLink = styled(NeutralLink).attrs({
  className: 'anime__link'
})`
  position:absolute;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

export const AnimeItemInner = styled(motion.div)<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & a.close-button {
    z-index: 10;
  }
  &:after {
      transition: opacity 1.5s ease-in-out;
      content: '';
      position:absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: black;
      width: 100%;
      height: 100%;
      opacity: 0;
      ${props => props.selected && css`
        opacity: 0.7;
      `};
  }
  & > h2 {
    position: sticky;
    top: 0;
  }
  & > img.background {
    transition: filter 1s ease-in-out;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    ${props => props.selected && css`
      filter: blur(0);
    `};
    transform: scale(1.1);
  }
  & > *:not(img) {
    z-index: 1;
    &:not(h2) {
      position: relative;
    }
  }
  ${props => props.selected && css`
    cursor: auto;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    overflow: hidden;
    height: 100%;
    width: 100%;
  `}
`

export const AnimeItemContentContainer = styled(motion.div)`
  min-height: inherit;
  flex: 1;
  color: black;
  background: whitesmoke;
  padding: 20px;
  transform-origin: bottom center;
`

export const AnimeCover = styled.img`
  float: left;
  border-radius: 6px;
  margin: -100px 20px 16px 0;
  box-shadow: 0 10px 40px #00000021;
  ${breakpoint('mobile', css`
    width: 126px;
  `)}
`

export const AnimeBanner = styled(motion.img)`
  position: fixed;
  height: 50vh;
  width: 100%;
  object-fit: cover;
`

export const BackIcon = styled(motion.span)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  position: fixed;
  top: 48px;
  left: 10px;
  & > img {
    width: 100%;
    height: 100%;
  }
`

export const AnimeTitle = styled(motion.h2)`
  display: flex;
  align-items: center;
`
