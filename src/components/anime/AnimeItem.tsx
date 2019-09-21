import React, {useEffect, useRef} from 'react'
import {motion, useInvertedScale, useMotionValue} from 'framer-motion'
import styled, {css} from 'styled-components'
import {RecommendationsList_RecommendationFragment} from 'graphql/components'
import {breakpoint, customScrollbar} from 'styles/module/mixins'
import AnimeRelatedRecommendations from 'components/recommendations/AnimeRelatedRecommendations'
import NeutralLink from 'components/ui/NeutralLink'

export const openSpring = {type: "spring", stiffness: 200, damping: 30};
export const closeSpring = {type: "spring", stiffness: 300, damping: 35};

const GoToAnimeLink = styled(NeutralLink).attrs({
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

const AnimeItemInner = styled(motion.div)<{ selected: boolean }>`
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

const AnimeItemContentContainer = styled(motion.div)`
  min-height: inherit;
  flex: 1;
  color: black;
  background: whitesmoke;
  padding: 20px;
  transform-origin: bottom center;
`

const AnimeCover = styled.img`
  float: left;
  border-radius: 6px;
  margin: -100px 20px 16px 0;
  box-shadow: 0 10px 40px #00000021;
  ${breakpoint('mobile', css`
    width: 126px;
  `)}
`

const AnimeBanner = styled(motion.img)`
  position: fixed;
  height: 50vh;
  width: 100%;
  object-fit: cover;
`

const BackIcon = styled(motion.span)`
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

const AnimeTitle = styled(motion.h2)`
  display: flex;
  align-items: center;
`

interface AnimeProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
  readonly anime: RecommendationsList_RecommendationFragment,
  readonly isSelected: boolean,
}

const AnimeItem: React.FC<AnimeProps> = ({anime, isSelected, children, ...rest}) => {
  const zIndex = useMotionValue(isSelected ? 2 : 0);
  const {scaleX, scaleY} = useInvertedScale()
  const item = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected) {
      if (!document.body.classList.contains('overflow')) {
        document.body.classList.add('overflow')
      }
      if (item.current) {
        item.current.scrollTop = 0
      }
    } else {
      if (document.body.classList.contains('overflow')) {
        document.body.classList.remove('overflow')
      }
      if (item.current) {
        item.current.scrollTop = 0
      }
    }
  }, [isSelected])

  const checkZIndex = (latest: any) => {
    if (isSelected) {
      zIndex.set(2);
    } else if (!isSelected && latest.scaleX < 1.01) {
      zIndex.set(0);
    }
  }

  return (
    <AnimeItemInner
      {...rest}
      ref={item}
      selected={isSelected}
      whileHover={{opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.16)'}}
      whileTap={{opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.16)'}}
      style={{zIndex, scaleX, scaleY}}
      initial={{opacity: 0.5}}
      layoutTransition={isSelected ? openSpring : closeSpring}
      animate={isSelected ? 'selected' : 'show'}
      onUpdate={checkZIndex}
      variants={{
        show: {opacity: 0.5, width: 'auto', borderRadius: '3px', overflowY: 'hidden'},
        selected: {
          opacity: 1,
          borderRadius: 0, overflowY: 'auto', transition: {
            staggerChildren: 0.5
          }
        }
      }}
      key={anime.malId!}>
      {!isSelected && <GoToAnimeLink to={`/anime/${anime.slug}`}/>}
      <motion.img className="background" src={anime.imageUrl || ''} alt=""
                  variants={{
                    show: {position: 'absolute', scale: 1.1},
                    selected: {position: 'fixed', scale: 1.2}
                  }}
      />
      <AnimeBanner
        initial={{
          opacity: 0
        }}
        variants={{
          show: {opacity: 0, transition: {delay: 0}, display: 'none'},
          selected: {opacity: 1, transition: {delay: 2}, display: 'block'}
        }}
        src={anime.bannerImageUrl!}
      />
      <NeutralLink className="close-button" to="/">
        <BackIcon
          initial="show"
          variants={{
            show: {opacity: 0, x: -40, display: 'none', transition: {delay: 0}},
            selected: {opacity: 1, x: 0, display: 'inline-flex', transition: {delay: 2}}
          }}
        >
          <img src={require('assets/icons/back.svg')} alt=""/>
        </BackIcon>
      </NeutralLink>
      <AnimeTitle
        initial="show"
        variants={{
          show: {
            padding: '20px 20px 20px 20px',
            marginBottom: 0,
            paddingBottom: undefined,
            fontSize: '16px',
            fontWeight: 400,
            maxHeight: '100%'
          },
          selected: {
            padding: '40px 40px 0px 40px',
            marginBottom: '30vh',
            fontSize: '32px',
            fontWeight: 700,
            maxHeight: '50vh'
          }
        }}
      >
        {anime.title.english}
      </AnimeTitle>
      {!isSelected && anime.related && anime.related.length > 0 &&
      <AnimeRelatedRecommendations related={anime.related}/>
      }
      <AnimeItemContentContainer
        transition={{duration: 0.3}}
        initial={{scaleY: 0, opacity: 0}}
        variants={{
          show: {scaleY: 0, height: '100%', opacity: 0, display: 'none'},
          selected: {scaleY: 1, height: 'auto', opacity: 1, display: 'block'}
        }}
      >
        <AnimeCover src={anime.imageUrl || '#'}/>
        <p>{anime.description}</p>
      </AnimeItemContentContainer>
    </AnimeItemInner>
  )
}

export default AnimeItem
