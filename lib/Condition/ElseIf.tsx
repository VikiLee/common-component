import React from 'react'

export default (props: { condition: boolean | number | null | undefined | string, children: React.ReactChild | React.ReactChildren }): React.ReactElement => {
  return <>{ props.children }</>
}