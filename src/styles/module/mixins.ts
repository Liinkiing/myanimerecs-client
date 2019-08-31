import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components/macro'

export const breakpoint = (size: 'mobile' | 'tablet' | 'desktop', innerCss: FlattenSimpleInterpolation | TemplateStringsArray | CSSObject) => {
  let px;
  switch (size) {
    case "mobile":
      px = 420;
      break;
    case "tablet":
      px = 768;
      break;
    case "desktop":
      px = 992;
      break;
  }

  return css`
    @media screen and (max-width: ${px}px) {
      ${innerCss}
    }
  `
}
