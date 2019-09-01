import styled from "styled-components";
import {Link, LinkProps} from "@reach/router";

const NeutralLink = styled(Link)<LinkProps<{}>>`
  color: inherit;
  &:hover {
    color: inherit;
  }
`

export default NeutralLink
