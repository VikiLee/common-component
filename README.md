# `common-component`

> 通用组件，用react hook实现，如果react版本低于16.8.0的项目用不了

## 目录
- [Condition](#condition)
- [LazyImage](#lazyimage)
- [Flexible](#flexible)
- [Sticky](#sticky)

## Condition
用于条件渲染
### usage 
```

<Condition>
  <Condition.If condition={bool}>
    do someting
  </Condition.If>
  <Condition.ElseIf condition={bool2}>
    do others
  </Condition.ElseIf>
  <Condition.Else>
    do rest
  </Condition.Else>
</Condition>
```

## LazyImage
用于图片懒加载，在图片未在视图内都时候不加载，出现在视图后才加载
### usage
用法同普通的img标签
```
<LazyImage src={url} width={100} height={100}/>
```

## Flexible
用于自适应布局，根据容器的宽度控制一行显示多少元素以及自适应控制元素之间的边距。
### usage
```
import React, { useRef } from 'react'
export default(): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef}>
      <Flexible 
        containerRef={containerRef} 
        itemWidth={220} 
        maxRows={6} 
        minRows={4} 
        className="product-item">
        <>
          item1
        </>
        <>
          item2
        </>
        <>
          item3
        </>
      </Flexible>
    </div>
  )
}
```

property | description | type | required
---|--- | --- | ---
containerRef | 容器元素的ref，自适应需要动态获取容器的宽度 | React.RefObject<HTMLElement> | true
itemWidth | 每个元素的宽度 | number | true
maxRows | 一行最多显示多少个元素 | number | false
minRows | 一行至少显示多少个元素 | number | false
... | 普通元素属性 | React.HTMLProps<HTMLDivElement> | false

## Sticky
吸顶组件
### usage
```
 <Sticky top={56}>
    <div style={{height: 50, borderTop: '1px solid #ddd'}}> 
      nav
    </div>
  </Sticky>
```
property | description | type | required
---|--- | --- | ---
top | 需要吸顶的顶部位置，当滚动到距离顶部top到位置时，会吸顶，默认为0 | number | false

