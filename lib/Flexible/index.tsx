import React, { useState, useCallback, useEffect } from 'react'
import { throttle, omit } from 'lodash'

interface Props extends React.HTMLProps<HTMLDivElement> {
  itemWidth: number;
  containerRef: React.RefObject<HTMLElement>;
  maxRows?: number;
  minRows?: number;
  children: React.ReactElement[];
}
export default (props: Props): React.ReactElement => {

  const [rows, setRows] = useState<number>(0)
  const [marginRight, setMarginRight] = useState<number>(0)

  const adapt = useCallback(() => {
    if (props.containerRef.current) {
      const width = props.containerRef.current.clientWidth
      let rows = Math.floor(width / props.itemWidth)
      if (props.maxRows && rows > props.maxRows) {
        // 一行最多显示${props.maxRows}个
        rows = props.maxRows
      } else if (props.minRows && props.minRows > rows) {
        // 一行最少显示${props.minRows}个
        rows = props.minRows
      }
      setRows(rows)
      const margin = (width - rows * props.itemWidth) / (rows - 1)
      setMarginRight(margin)
    }
    
  }, [])

  const resizeFn = useCallback(throttle(() => {
    adapt()
  }), [])

  useEffect(() => {
    adapt()
    window.addEventListener('resize', resizeFn)
    return () => window.removeEventListener('resize', resizeFn)
  }, [])

  return (
    <>
    {
      props.children.map((child: React.ReactElement, index: number) => {
        return (
          <div key={index} {...omit(props, ['itemWidth', 'width', 'children', 'maxRows'])} style={{marginRight: (index + 1) % rows === 0 ? 0 : marginRight, display: 'inline-block'}}>
            { child }
          </div>
        )
      })
    }
    </>
  )
}