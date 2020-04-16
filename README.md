# `common-component`

> 通用组件，用react hook实现，如果react版本低于16.8.0的项目用不了

## 目录
- [Condition](#condition)
- [LazyImage](#lazyimage)

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

