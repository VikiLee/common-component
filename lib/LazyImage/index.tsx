import React, { useEffect, useMemo, useState, HTMLProps, useRef } from 'react'
const defaultUrl = require('common-component/dist/LazyImage/default-image.svg')

function getClientHeight(): number {
  let clientHeight: number = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}

const throttle = (func: Function, limit: number = 16.6) => {
  let inThrottle: boolean = false
  return function() {
    const args = arguments
    const context: any = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default (props: HTMLProps<HTMLImageElement>): React.ReactElement => {

  const [visible, setVisible] = useState<boolean>(false)
  const el = useRef<HTMLImageElement>(null)
  
  const inViewShow = useMemo(() => {
    return () => {
      if (el && el.current) {
        const rect = el.current.getBoundingClientRect()
        // 出现在视野的时候加载元素
        if(0 < rect.top && rect.top < getClientHeight()) {
          setVisible(true)
          document.removeEventListener('scroll', throttleFn, false)
        }
      }
    }
  }, [el.current])

  const throttleFn = useMemo(() => throttle(inViewShow), [inViewShow])

  useEffect(() => {
    if (!el.current) {
      return
    }
    // 支持IntersectionObserver的使用这个api 
    if ("IntersectionObserver" in window) {
      let lazyCompObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setVisible(true)
            lazyCompObserver.unobserve(entry.target)
          }
        })
      })
      if(el.current && el.current.nodeType === 1) {
        lazyCompObserver.observe(el.current!)
      }
    } else {
      // 不支持的使用getBoundingClientRect和scroll来判断
      inViewShow()
      document.addEventListener('scroll', throttleFn, false)
    }
    return () => document.removeEventListener('scroll', throttleFn, false)
  }, [el.current])

  return <img ref={el} src={visible ? props.src : defaultUrl} width={props.width} height={props.height}/>
}