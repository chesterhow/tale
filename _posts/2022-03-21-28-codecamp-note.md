---
layout: post
title: '[코드캠프#5] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

삼항연산자 : 길게 사용하면 알아보기가 어려워진다. 1줄 정도일때만 사용하는 것을 추천

## 조건부 렌더링

```
data && data.fetchProfile // data가 참이니까 뒤에가 실행된다
data || data.fetchProfile // data가 거짓이면 뒤에가 실행된다
data ?? data.fetchProfile // data가 null undefined 일때 뒤에가 실행된다
```

거짓 : `0`, `''`, `false`, `null`, `undefined`, `Nan`

[거짓같은 값 Mdn문서](https://developer.mozilla.org/ko/docs/Glossary/Falsy)

Nullish coalescing operator
널 병합 연산자 (??) 는 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.
[Nullish coalescing operator MDN anstjqhrl](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)


## 폴더구조의 체계화

### container / presentational 패턴

`container` / `presentational` 패턴이란, 소스코드를 자바스크립트(기능)와 JSX(UI)로 나누는 방법을 의미합니다.

여기서 `container`는 자바스크립트(기능) 부분을 의미하고, `presentational`은 JSX(UI) 부분을 의미합니다.

- 부모 컴포넌트(container)가 실행되고 자식(presentational) 컴포넌트가 불러와져 합쳐서 실행된다.


### props
- 그러나 내부 데이터와 기능은 끊어지게 된다. 이를 연결해주는 것이 props이다
객체의 형태로 자식 컴포넌트에 값을 연결해준다. 마치 함수의 파라미터처럼

-  Props: 부모컴포넌트가 자식컴포넌트에게 물려주는 변수/함수
단, 데이터의 흐름은 부모에서 자식으로 단방향으로만 제공된다




