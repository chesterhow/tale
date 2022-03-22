---
layout: post
title: '조건부 렌더링'
author: 'Nostrss'
comments: true
tags: react javascript
excerpt_separator:
sticky:
hidden:
---

## && || ?? 연산자

```javascript
data && data.fetchProfile // data가 참이니까 뒤에가 실행된다
data || data.fetchProfile // data가 거짓이면 뒤에가 실행된다
data ?? data.fetchProfile // data가 null undefined 일때 뒤에가 실행된다
```

### Nullish coalescing operator

[거짓같은 값 Mdn문서](https://developer.mozilla.org/ko/docs/Glossary/Falsy)

널 병합 연산자 (??) 는 왼쪽 피연산자가 `null` 또는 `undefined`일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.

[Nullish coalescing operator MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)


## 삼항연산자
```javascript
data ? data.fetchProfile : 'Data Loading...'
```
아래와 같이 사용한다.
>[데이터 또는 통신값] ? [값이 있을때] : [값이 없을 때]


## 옵셔널체이닝(Optional-Chaining)
`optional-chaing`이란 기존의 `&&` 연산자를 쓰면서 길어졌던 코드를 더욱 간결하게 사용하는 연산자 입니다.

```javascript
data?.fetchProfile
```
**optional-Chaining**은 **?** 연산자 앞 객체의 참조가 ***undefined || null*** 이라면 ***undefined***를 리턴해줍니다. 

위에 있는 `삼항연산자`, `&& 연산자`와 똑같은 기능을 하는 것이죠.

