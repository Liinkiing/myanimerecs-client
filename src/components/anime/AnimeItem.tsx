import React, {useEffect, useRef, useState} from 'react'
import {motion, useInvertedScale, useMotionValue} from 'framer-motion'
import styled, {css} from 'styled-components'
import {RecommendationsList_RecommendationFragment} from 'graphql/components'
import {navigate} from '@reach/router'

export const openSpring = {type: "spring", stiffness: 200, damping: 30};
export const closeSpring = {type: "spring", stiffness: 300, damping: 35};

const AnimeItemInner = styled(motion.div)<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  border-radius: 10px;
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
  &:hover {
    cursor: pointer;
  }
  & > h2 {
    position: sticky;
    top: 0;
  }
  & > img {
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

interface AnimeProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
  readonly anime: RecommendationsList_RecommendationFragment
}

export const AnimeItemDetail: React.FC<{anime: RecommendationsList_RecommendationFragment }> = ({ anime }) => (
  <React.Fragment>
    <motion.img src={anime.imageUrl || ''} alt=""
                variants={{
                  show: {position: 'absolute', scale: 1.1},
                  selected: {position: 'fixed', scale: 1.2}
                }}
    />
    <motion.h2
      variants={{
        show: {padding: 20, fontSize: '16px', fontWeight: 400},
        selected: {padding: 40, paddingBottom: '40vh', fontSize: '32px', fontWeight: 700}
      }}
    >{anime.title}</motion.h2>
    <AnimeItemContentContainer
      transition={{duration: 0.4}}
      initial={{scaleY: 0}}
      variants={{
        show: {scaleY: 0, height: '100%'},
        selected: {scaleY: 1, height: 'auto', transition: { when: 'afterChildren'}}
      }}
    >{anime.description}</AnimeItemContentContainer>
  </React.Fragment>
)

const AnimeItem: React.FC<AnimeProps> = ({anime, children, ...rest}) => {
  const [selected, setSelected] = useState(false)
  const zIndex = useMotionValue(selected ? 2 : 0);
  const {scaleX, scaleY} = useInvertedScale()
  const item = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
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
      navigate('/')
    }
  }, [selected])

  const checkZIndex = (latest: any) => {
    if (selected) {
      zIndex.set(2);
    } else if (!selected && latest.scaleX < 1.01) {
      zIndex.set(0);
    }
  }

  return (
    <AnimeItemInner
      {...rest}
      onClick={() => {
        setSelected(s => !s)
      }}
      ref={item}
      selected={selected}
      whileHover={{scale: selected ? 1 : 1.05, opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.16)'}}
      whileTap={{scale: selected ? 1 : 1.05, opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.16)'}}
      style={{zIndex, scaleX, scaleY}}
      initial={{opacity: 0.5}}
      layoutTransition={selected ? openSpring : closeSpring}
      animate={selected ? 'selected' : 'show'}
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
        <AnimeItemDetail anime={anime}/>
    </AnimeItemInner>
  )
}

export default AnimeItem
