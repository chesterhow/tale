---
layout: post
title: '[React]디자인패턴'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## presentational & container 디자인 패턴이란?
`앱의 기능`과 `UI` 분리하여 소스코드를 작성하는 패턴

## container component
- 어떻게 `동작`하는지, 어떤 `로직`을 수행하는지 `기능`구현을 담당합니다.
- markup이나 스타일을 사용하지 않습니다.
- `Data`나 UI조작에 관한 `함수`를 만들고 `presenter` component에 전달합니다.

```javascript
import { useRouter } from 'next/router'
import BoardListUI from './BoardList.Presenter'

export default function BoardList() {

  const router = useRouter()

  const onClickMove1 = () => {
    router.push("/~~~~경로")

  }

  const onClickMove2 = () => {
    router.push("/~~~~경로")

  }

  const onClickMove3 = () => {
    router.push("/~~~~경로")

  }
  return (
    <BoardListUI
    onClickMove1={onClickMove1}
    onClickMove2={onClickMove2}
    onClickMove3={onClickMove3}
    />
  )
}
```

`return`에 `presenter`에게 전달할 `함수`와 `데이터`를 작성한다.


## presenter component
- 사용자가 직접 보고, 조작하는 컴포넌트 (ui와 관련)
- `container` component가 내려준 Data와 함수를 `prop`을 통해 전달 받습니다.

``` javascript
import * as S from './BoardList.styles'

export default function BoardListUI(props) {
    return (
        <S.Wrapper>
            <S.RoutingButton onClick={props.onClickMove1}>0000번 게시글  이동하기 !!!</S.RoutingButton>
            <S.RoutingButton onClick={props.onClickMove2}>0000번 게시글  이동하기 !!!</S.RoutingButton>
            <S.RoutingButton onClick={props.onClickMove3}>0000번 게시글  이동하기 !!!</S.RoutingButton>
        </S.Wrapper>
    )
}
```
container가 전달한 내용을 props를 통해서 받게 된다.
전달받은 함수와 데이터를 presenter에서 사용하기 위해서는 앞에 `props`를 붙여주면
접근이 가능해진다

