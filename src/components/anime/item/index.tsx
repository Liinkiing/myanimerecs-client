import React, {useEffect, useRef} from 'react'
import {motion, useInvertedScale, useMotionValue} from 'framer-motion'
import {RecommendationsList_RecommendationFragment} from 'graphql/components'
import {
  AnimeBanner,
  AnimeChart,
  AnimeCover,
  AnimeItemContentContainer,
  AnimeItemContentHeaderContainer,
  AnimeItemContentHeaderInformations,
  AnimeItemInner,
  AnimeTitle,
  BackIcon
} from './styled'
import {initial, transition, variants, whileHover, whileTap} from './framer'
import AnimeInformations from 'components/ui/anime/informations'

export const openSpring = {type: "spring", stiffness: 200, damping: 30};
export const closeSpring = {type: "spring", stiffness: 300, damping: 35};

interface AnimeProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
  readonly anime: RecommendationsList_RecommendationFragment,
  readonly isSelected: boolean,
  readonly onBack?: () => void,
  readonly onSelect?: () => void,
}

const AnimeItem = React.memo<AnimeProps>(({anime, isSelected, onBack, onSelect, children, ...rest}) => {
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
      onClick={() => {
        onSelect && !isSelected && onSelect()
      }}
      ref={item}
      selected={isSelected}
      style={{zIndex, scaleX, scaleY}}
      layoutTransition={isSelected ? openSpring : closeSpring}
      animate={isSelected ? 'selected' : 'show'}
      onUpdate={checkZIndex}
      whileHover={whileHover.AnimeItemInner}
      whileTap={whileTap.AnimeItemInner}
      initial={initial.AnimeItemInner}
      variants={variants.AnimeItemInner}
      key={anime.malId!}>
      <motion.img className="background" src={anime.media.background || ''} alt=""
                  variants={variants.AnimeItemInnerImg}
      />
      {!isSelected && <AnimeChart score={
        anime.related.reduce((prev, acc) => prev + acc.score, 0) / anime.related.length
      }/>}
      <AnimeBanner
        initial={initial.AnimeBanner}
        variants={variants.AnimeBanner}
        src={anime.media.banner!}
      />
        <BackIcon
          onClick={onBack ? onBack : () => {}}
          initial={initial.BackIcon}
          variants={variants.BackIcon}
        >
          <img src={require('assets/icons/back.svg')} alt=""/>
        </BackIcon>
      <AnimeTitle
        selected={isSelected}
        initial={initial.AnimeTitle}
        variants={variants.AnimeTitle}
      >
        {anime.title.english}
      </AnimeTitle>
      <AnimeItemContentContainer
        transition={transition.AnimeItemContentContainer}
        initial={initial.AnimeItemContentContainer}
        variants={variants.AnimeItemContentContainer}
      >
        <AnimeItemContentHeaderContainer>
          <AnimeCover src={anime.media.poster || anime.media.background}/>
          <AnimeItemContentHeaderInformations>
            <AnimeInformations anime={anime}/>
          </AnimeItemContentHeaderInformations>
        </AnimeItemContentHeaderContainer>
        <p>{anime.description}</p>
      </AnimeItemContentContainer>
    </AnimeItemInner>
  )
}, (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected)

export default AnimeItem
