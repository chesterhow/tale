---
layout: post
title: 'Typescript Generic 이란?'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

[Typescript Generic 문서보기](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html)

[Poeimweb Typescript Gerneric](https://poiemaweb.com/typescript-generic)

`TypeScript` 또한 정적 타입 언어이기 때문에 함수 또는 클래스를 정의하는 시점에 매개변수나 반환값의 타입을 선언하여야 한다. 

여기서 `Generic`은 `자료형`을 정하지 않고 여러 타입을 사용할 수 있게 해준다.
즉, `선언` 시점이 아니라 `생성` 시점에 타입을 명시하여 하나의 타입만이 아닌 `다양한 타입`을 사용할 수 있도록 하는 기법이다. 한번의 선언으로 다양한 타입에 `'재사용'`이 가능하다는 장점이 있다.
제네릭을 사용하게되면 따로 타입 변환을 할 필요가 없어서 프로그램의 성능이 향상되는 장점이 있다.

>제네릭을 사용하지 않을때 함수 선언
```javascript
function identity(arg: number): number {
  return arg;
}
```
1. 타입을 미리 지정하자면, 확실한 타입체크가 이뤄질 수 있겠지만 항상 `number`라는 타입을 받아야하므로 `범용성`이 떨어진다.
2. 그렇다고 `any`를 사용한다면 자료의 타입을 제한할 수 없을 뿐더러, 이 function을 통해 어떤 타입의 데이터가 리턴되는지 알 수 없다.


>제네릭을 사용할 때 함수 선언

```javascript
function identity<Type>(arg: Type): Type {
  return arg;
}
```

이렇게 선언하고 함수를 호출하면

```javascript
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // 오류: Type에는 .length 가 없습니다.
Property 'length' does not exist on type 'Type'.
  return arg;
}
```

아마 위와 같은 오류가 뜰것이다.
그래서 제네릭을 사용한 함수를 호출 할때는 아래와 같이 `호출`할때 `타입`을 지정해주어야 한다.
아래서는 배열로 지정해주고 있다.

```javascript
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}
```

아래와 같이 제네릭을 선언할 때 `T`를 관용적으로 사용하기도 한다.

```javascript
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}
```