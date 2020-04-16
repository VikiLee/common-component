import React from 'react'

export default (props: { children: React.ReactElement| React.ReactElement[] | null }): React.ReactElement => {
  return <>{ props.children }</>
}