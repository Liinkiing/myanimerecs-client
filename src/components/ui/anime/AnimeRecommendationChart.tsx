import React, {useEffect, useMemo, useRef} from 'react'
import styled from 'styled-components/macro'
import {mapRange} from 'utils/functions'

interface Props {
  readonly score: number
}

const AnimeRecommendationChartInner = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  span.donut-text {
    position:absolute;
    font-size: 14px;
  }
`

const MAPPING_COLORS = ['red', 'yellow', 'green']

const AnimeRecommendationChart: React.FC<Props> = ({score, ...rest}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const color = useMemo(() => MAPPING_COLORS[Math.floor(mapRange(score, 0, 100, 0, 3))], [score])
  const donutty = useRef(null)
  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      donutty.current = new Donutty(ref.current, {
        color,
        bg: 'white',
        text( state: any ) {
          const score = state.value / (state.max - state.min) * 100
          return score === 0 ? '?' : Math.floor(score);
        },
        min: 0,
        max: 100,
        value: isNaN(score) ? 0 : score,
        radius: 18,
        thickness: 4,
        padding: 2
      });
    }
  }, [color, score])
  return (
    <AnimeRecommendationChartInner ref={ref} {...rest}/>
  )
}

export default AnimeRecommendationChart
