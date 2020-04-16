import React, { useMemo } from 'react'
import If from './If'
import ElseIf from './ElseIf'
import Else from './Else'

interface Props {
  children: React.ReactElement | React.ReactElement[]
}

const Condition = (props: Props) => {
  const render = useMemo(() => {
    let element = null
    let hasIf = false
    const children = React.Children.toArray(props.children)
    for (let child of children) {
      hasIf = hasIf || child.type === If
      if (child.type === If && child.props.condition) {
        element = child.props.children
        break
      } else if (child.type === ElseIf) {
        if (!hasIf) {
          console.error('Condition.ElseIf should be used with Condition.If')
          break
        }
        if (child.props.condition) {
          element = child.props.children
          break
        }
      } else if (child.type === Else){
        if (!hasIf) {
          console.error('Condition.Else should be used with Condition.If')
          break
        }
        element = child.props.children
        break
      }
    }
    return element
  }, [props])
  return (<>{ render }</>)
}

Condition.If = If
Condition.ElseIf = ElseIf
Condition.Else = Else

export default Condition
