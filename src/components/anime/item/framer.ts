import {TargetAndTransition, Transition, VariantLabels, Variants} from 'framer-motion'
import {rgba} from 'polished'

type InitialProps = boolean | VariantLabels | object

type WhileProps = string | TargetAndTransition

export const initial = {
  AnimeItemInner: {
    borderRadius: '12px',
    opacity: 0.5
  } as InitialProps,
  AnimeBanner: {
    opacity: 0
  } as InitialProps,
  BackIcon: "show",
  AnimeTitle: "show",
  AnimeItemContentContainer: {scaleY: 0, opacity: 0} as InitialProps
}

export const transition = {
  AnimeItemContentContainer: {
    duration: 0.2
  } as Transition
}

export const variants = {
  AnimeItemInner: {
    show: {opacity: 0.5, width: 'auto', borderRadius: '12px', overflowY: 'hidden'},
    selected: {
      opacity: 1,
      borderRadius: 0, overflowY: ('overlay' as any), transition: {
        staggerChildren: 0.5
      }
    }
  } as Variants,
  AnimeItemInnerImg: {
    show: {position: 'absolute', filter: 'blur(0)'},
    selected: {position: 'fixed', filter: 'blur(15px)', transition: { delay: 0 }}
  } as Variants,
  AnimeBanner: {
    show: {opacity: 0, transition: {delay: 0}, display: 'none'},
    selected: {opacity: 1, transition: {delay: 2}, display: 'block'}
  } as Variants,
  BackIcon: {
    show: {opacity: 0, x: -40, display: 'none', transition: {delay: 0}},
    selected: {opacity: 1, x: 0, display: 'inline-flex', transition: {delay: 2}}
  } as Variants,
  AnimeTitle: {
    show: {
      padding: '20px 20px 20px 20px',
      marginBottom: 0,
      paddingBottom: undefined,
      fontSize: '16px',
      fontWeight: 400,
      maxHeight: '100%'
    },
    selected: {
      padding: '40px 60px 0px 60px',
      marginBottom: '25vh',
      fontSize: '32px',
      fontWeight: 700,
      maxHeight: '50vh'
    }
  } as Variants,
  AnimeItemContentContainer: {
    show: {scaleY: 0, height: '100%', opacity: 0, display: 'none'},
    selected: {scaleY: 1, height: 'auto', opacity: 1, display: 'block'}
  } as Variants
}

export const whileTap = {
  AnimeItemInner: {
    opacity: 1,
    boxShadow: '0 10px 30px rgba(0,0,0,0.16)'
  } as WhileProps
}

export const whileHover = {
  AnimeItemInner: {
    opacity: 1,
    boxShadow: '0 10px 30px rgba(0,0,0,0.16)'
  } as WhileProps
}

