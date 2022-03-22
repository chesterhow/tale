---
layout: post
title: "[JS #6] 호이스팅(hoisting) "
author: "Nostrss"
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

[제로베이스 JavaScript 완전 정복](https://zero-base.co.kr/category_dev_camp/JS_challenge)

## 호이스팅

> `JavaScript`에서 `호이스팅(hoisting)`이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다. var로 선언한 변수의 경우 호이스팅 시 `undefined`로 변수를 초기화합니다. 반면 `let`과 `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않습니다.

> 호이스팅을 설명할 땐 주로 "변수의 선언과 초기화를 분리한 후, 선언만 코드의 최상단으로 옮기는" 것으로 말하곤 합니다. 따라서 변수를 정의하는 코드보다 사용하는 코드가 앞서 등장할 수 있습니다. 다만 선언과 초기화를 함께 수행하는 경우, 선언 코드까지 실행해야 변수가 초기화된 상태가 됨을 주의하세요.

[MDN 호이스팅 바로가기 ](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)

자바스크립트는 변수 선언을 끌어올리는 성질이 있다. 그래서 `호이스팅`이라는 상황이 발생하게 된다.

```javascript
function foo() {
  console.log(hoist); //undefined

  var hoist = "호이스팅";

  console.log(hoist); // 호이스팅
}
```

위와 코드가 `호이스팅`이 발생하는 코드인데, 풀어보면 아래와 같이 변수를 끌어올리게 된다고 한다.

```javascript
function foo() {
  var hoist; // 변수 선언을 끌어올리는 부분

  console.log(hoist); // undefined

  hoist = "호이스팅";

  console.log(hoist); // 호이스팅
}
```

이런 현상을 방지 하기 위해서는 변수 선언시 `var`이 아니라 아래처럼 `let`과 `const`를 쓰면 된다고 한다.
작성해보니 `Quokka`에서 변수 선언 전에 접근할 수 없다는 메시지가 나오는 걸 알 수 있었다.

```javascript
function foo() {
  console.log(hoist); // Quokka : Cannot access 'hoist' before initailization

  let hoist = "호이스팅";

  console.log(hoist);
}
```

> - 자바스크립트는 변수를 선언하면 끌어올리는 성향이 있다.

> - 이를 방지 하고자 변수 선언 시 `const` > `let` 순으로 사용하도록 노력하자
