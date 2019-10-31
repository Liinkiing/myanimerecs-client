import styled, {css} from 'styled-components/macro'
import NeutralLink from 'components/ui/NeutralLink'
import {motion} from 'framer-motion'
import {breakpoint, mbBreakpoint} from 'styles/module/mixins'
import AnimeRecommendationChart from 'components/ui/anime/AnimeRecommendationChart'

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
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  ${props => !props.selected && css`
    &:hover {
      cursor: pointer;
    }
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

export const AnimeItemContentHeaderInformations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  ${mbBreakpoint('mobile', css`
    flex-direction: row;
    justify-content: initial;
    & > * + * {
      margin-left: 20px;
    }
  `)}
`

export const AnimeItemContentHeaderContainer = styled.header`
  display: flex;
  margin-top: -100px;
  margin-bottom: 20px;
  position: relative;
  align-items: center;
  ${AnimeItemContentHeaderInformations} {
    flex: 1;
    margin-left: 10px;
    align-self: stretch;
    ${mbBreakpoint('mobile', css`
      align-self: start;
    `)}
  }
`

export const AnimeCover = styled.img`
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.35);
  width: 225px;
  ${breakpoint('mobile', css`
    width: 126px;
  `)}
`

export const AnimeBanner = styled(motion.img)`
  position: fixed;
  height: 50vh;
  width: 100%;
  object-fit: cover;
  background-position: 50% 35%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -58px;
`

export const BackIcon = styled(motion.div)`
  margin-right: 10px;
  z-index: 10 !important;
  position: fixed !important;
  top: 24px;
  left: 0;
  padding: 20px;
  width: 60px;
  height: 60px;
  & > img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`

export const AnimeChart = styled(AnimeRecommendationChart)`
  position:absolute !important;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.36);
  backdrop-filter: blur(10px);
  border-radius: 100%;
`

export const AnimeTitle = styled(motion.h2)<{selected: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: auto;
  ${props => !props.selected && css`
    background: rgba(0,0,0,0.39);
    backdrop-filter: blur(15px);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-top: 2px solid rgba(255,255,255,0.17);
  `}
`
