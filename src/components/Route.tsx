import React, {FC} from 'react'
import {RouteComponentProps} from '@reach/router'

type Props = { component: FC } & RouteComponentProps

const Route: FC<Props> = ({component: Component, ...rest}) => (
  <Component {...rest} />
);

export default Route;
