---
layout: post
title: '꼰대 타입의 타입스크립트'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## 자바스크립트의 시작

자바스크립트는 1995년 넷스케이프사의 브렌던 아이크(Brendan Eich)가 자사의 웹브라우저인 Navigator 2에 탑재하기 위해 개발한 스크립트 언어이다. 

초창기 자바스크립트는 웹페이지의 보조적인 기능을 수행하기 위해 한정적인 용도로 사용되었다. 

이 시기에 대부분 로직은 주로 웹서버에서 실행되었고 브라우저(클라이언트)는 서버로부터 전달받은 HTML과 CSS를 렌더링하는 수준이었다.

지금은 시간이 흘러 많이 발전하였지만 태생적인 한계로 단점들도 존재한다고 한다.

>Prototype-based Object Oriented Language

>Scope와 this

>동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어

이런 단점은 개발자들을 `혼란`스럽게 한다고 한다. 

특히 코드가 복잡해질 수록 디버그와 테스트 공수가 증가하는 등의 문제를 일으킬 수 있어서 `규모가 큰 프로젝트`에서는 순수 자바스크립트로는 어려움이 많다고 한다.

이를 극복하기 위한 방안 중 하나로 `TypeScript`가 등장하였고 자바스크립트 대체 언어의 하나로써 자바스크립트(ES5)의 Superset(상위확장)으로 볼 수 있다.

## 타입스크립트의 장점

### 정적 타입

```typescript
function sum(a: number, b: number) {
  return a + b;
}

sum('x', 'y');
// error TS2345: Argument of type '"x"' is not assignable to parameter of type 'number'.
```
위의 코드는 `javascript`에서는 아무문제가 없다.

하지만 `typescript`에서는 에러메시지가 나온다.

`javascript`는 `동적`으로 `느슨한` 타입의 언어였지만 `TypeScript`는 `정적` 타입을 지원하므로 `컴파일 단계`에서 `오류`를 포착할 수 있는 장점이 있다. 

명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있다. 이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 한다.

### 강력한 객체지향 프로그래밍 지원

강력한 `객체지향 프로그래밍` 지원은 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성할 수 있도록 도우며, Java, C# 등의 클래스 기반 객체지향 언어에 익숙한 개발자가 자바스크립트 프로젝트를 수행하는 데 진입 장벽을 낮추는 효과가 있다고 한다.



