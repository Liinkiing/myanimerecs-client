import React, {useEffect, useRef} from 'react'
import {motion, useInvertedScale, useMotionValue} from 'framer-motion'
import {RecommendationsList_RecommendationFragment} from 'graphql/components'
import AnimeRelatedRecommendations from 'components/recommendations/AnimeRelatedRecommendations'
import NeutralLink from 'components/ui/NeutralLink'
import {
  AnimeBanner,
  AnimeCover,
  AnimeItemContentContainer,
  AnimeItemInner,
  AnimeTitle,
  BackIcon,
  GoToAnimeLink
} from './styled'
import {initial, transition, variants, whileHover, whileTap} from './framer'

export const openSpring = {type: "spring", stiffness: 200, damping: 30};
export const closeSpring = {type: "spring", stiffness: 300, damping: 35};

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
      style={{zIndex, scaleX, scaleY}}
      layoutTransition={isSelected ? openSpring : closeSpring}
      animate={isSelected ? 'selected' : 'show'}
      onUpdate={checkZIndex}
      whileHover={whileHover.AnimeItemInner}
      whileTap={whileTap.AnimeItemInner}
      initial={initial.AnimeItemInner}
      variants={variants.AnimeItemInner}
      key={anime.malId!}>
      {!isSelected && <GoToAnimeLink to={`/anime/${anime.slug}`}/>}
      <motion.img className="background" src={anime.imageUrl || ''} alt=""
                  variants={variants.AnimeItemInnerImg}
      />
      <AnimeBanner
        initial={initial.AnimeBanner}
        variants={variants.AnimeBanner}
        src={anime.bannerImageUrl!}
      />
      <NeutralLink className="close-button" to="/">
        <BackIcon
          initial={initial.BackIcon}
          variants={variants.BackIcon}
        >
          <img src={require('assets/icons/back.svg')} alt=""/>
        </BackIcon>
      </NeutralLink>
      <AnimeTitle
        initial={initial.AnimeTitle}
        variants={variants.AnimeTitle}
      >
        {anime.title.english}
      </AnimeTitle>
      {!isSelected && anime.related && anime.related.length > 0 &&
      <AnimeRelatedRecommendations related={anime.related}/>
      }
      <AnimeItemContentContainer
        transition={transition.AnimeItemContentContainer}
        initial={initial.AnimeItemContentContainer}
        variants={variants.AnimeItemContentContainer}
      >
        <AnimeCover src={anime.imageUrl || '#'}/>
        <p>{anime.description}</p>
      </AnimeItemContentContainer>
    </AnimeItemInner>
  )
}

export default AnimeItem
