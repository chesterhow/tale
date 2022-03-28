---
layout: post
title: '[React] 함수형 or 클래스형'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## 과거에는 클래스형 현재는 함수형 권장
`리액트`에서 과거에는 `클래스(class)`형 컴퍼넌트를 많이 사용했었다. 

하지만 2019년 이후 `함수형(functional)`컴퍼넌트에 리액트 `훅(hook)`을 지원하기 시작했고 이제는 공식 문서에서도 `함수형` 컴퍼넌트를 사용할 것을 `권장`하고 있다.

[관련링크](https://ko.reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)

>함수형 컴포넌트 예시
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

>클래스형 컴포넌트 예시
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
리액트 관점에서 위의 2가지 유형의 컴포넌트는 동일하다.하지만 함수형 컴포넌트가 조금 더 간결해 보인다.

## 클래스형 컴포넌트는 필요가 없는가?

`클래스`형 컴포넌트는 로직과 상태를 컴포넌트 내에서 구현하기 때문에 `stateful`로 불리기도 하며 것이며 상대적으로 `복잡한 UI 로직`을 가지고 있다. 

반면 `함수형` 컴포넌트는 state를 사용하지 않고 단순하게 데이터를 받아서(props) UI에 뿌려주기 때문에 `stateless`라고 불리는 것이다. 

리액트 훅이 등장하면서 함수형 컴포넌트를 더 많이 사용하는 추세가 되었지만 `오래된` 리액트 코드의 경우 `클래스형` 컴포넌트로 이루어진 경우가 더 많으므로 **두 가지 모두** 다 잘 알고 있어야 리액트로 개발을 할 때 어려움을 겪지 않을 것이라고 생각한다.



