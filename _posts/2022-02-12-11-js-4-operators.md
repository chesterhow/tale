---
layout: post
title: "[JS #4] (논리,삼항)연산자 feat: if/else "
author: "Nostrss"
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

[제로베이스 JavaScript 완전 정복](https://zero-base.co.kr/category_dev_camp/JS_challenge)

## 논리연산자

### AND 연산자(&&)

```javascript
var a1 = true && true; // t && t returns true
var a2 = true && false; // t && f returns false
var a3 = false && true; // f && t returns false
var a4 = false && 3 == 4; // f && f returns false
var a5 = "Cat" && "Dog"; // t && t returns Dog
var a6 = false && "Cat"; // f && t returns false
var a7 = "Cat" && false; // t && f returns false
```

엑셀에서 쓰던 `AND` 연산자는 둘다 참일때 참을 반환해주었다.
그런데 a5,a6,a7의 값이 나의 예상과는 조금 다르다.

### OR 연산자(||)

```javascript
var o1 = true || true; // t || t returns true
var o2 = false || true; // f || t returns true
var o3 = true || false; // t || f returns true
var o4 = false || 3 == 4; // f || f returns false
var o5 = "Cat" || "Dog"; // t || t returns Cat
var o6 = false || "Cat"; // f || t returns Cat
var o7 = "Cat" || false; // t || f returns Cat
```

`OR` 연산자는 둘중에 하나만 참이어도 참일 떄 사용하는 연산자이다.
그런데 `OR` 연산자도 o5,o6,o7의 값이 나의 예상과는 조금 다르게 나왔다.

조금 검색을 해보니 답을 찾을 수 있었다.

[모던 자바스크립트 - 논리연산자](https://ko.javascript.info/logical-operators)

> AND 연산자 = 첫번쨰 falsy를 찾아 반환한다.

> OR 연산자 = 첫번째 truthy를 찾아 반환한다.

자바스크립트는 내가 기존에 알던 것과 같으면서도 미묘하게 다른점들이 조금 있는 것 같다...

### 삼항연산자(Conditional_Operator)

```javascript
const temp = 1 === "1" ? "참일때" : "거짓일때"; //거짓일때
```

형태가 아주 생소한 연산자다.

뜯어보니 `if/else`와 아주 유사하다.

> condition ? exprIfTrue : exprIfFalse

이런 형태로 조건이 `참`이면 `exprIfTrue`, 조건이 `false`이면 `exprIfFalse`를 반환한다.

MDN을 찾아보니 좋은 예제가 있어서 가져왔다.

[MDN 삼항 조건 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

### null 값 처리하기

`NULL`값을 처리할떄 아래처럼 사용한다고 한다.

```javascript
let greeting = (person) => {
  let name = person ? person.name : `stranger`;
  return `Howdy, ${name}`;
};

console.log(greeting({ name: `Alice` })); // "Howdy, Alice"
console.log(greeting(null)); // "Howdy, stranger"
```

### 연속된 조건문 처리하기

```javascript
function example(…) {
    return condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
}

// 위의 코드는 아래의 코드와 동일합니다.

function example(…) {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
}
```
