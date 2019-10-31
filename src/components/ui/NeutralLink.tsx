import styled from "styled-components";
import {Link, LinkProps} from 'react-router-dom';

const NeutralLink = styled(Link)<LinkProps<{}>>`
  color: inherit;
  &:hover {
    color: inherit;
  }
`

export default NeutralLink
