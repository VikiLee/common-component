import React from 'react'

import{ Wrapper } from './index'

export default (props: { condition: boolean | number | null | undefined | string, children: React.ReactNode }): React.ReactNode => {
  return Wrapper(props.children)
}