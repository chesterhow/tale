---
layout: post
title: "[JS #3] NULL과 undefined 너희는 뭐니? "
author: "Nostrss"
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

[제로베이스 JavaScript 완전 정복](https://zero-base.co.kr/category_dev_camp/JS_challenge)

## undefined

널과는 다른 개념이다. 비어있다는 개념보다는 아직 정의 되지 않은 상태로 이해를 하도록 하자.

```javascript
let variable; // 선언
typeof variable; // undefined
```

이렇게 변수가 선언만 되고 정의가 되지 않은 경우 `undefined` 값이 들어 있게 된다.

> 현업에서는 이렇게 선언할떄 `undefined`로 그냥 둘지 아니면 `NULL`로 할당을 해둘지 팀에서 결정해서 사용하는 경우가 있다고 한다.

## 이상한 NULL과 요상한 undefined 관계

### 이상한 NULL의 값의 변화

```javascript
!null; // true
!!null; // false
```

`NULL`의 반대가 `true`라고 나온다.

그런데 다시 반대로 하면 `false`가 나온다.

> ???????????????????

나는 다시 `NULL`이 나와야 한다고 생각하는데, `false`가 나오니 당황스럽다.

나는 반대라 하면 아래와 같은 수식이 생각된다.

```
1 * -1 = -1
-1 * -1 = 1
```

수학시간에 배운것 처럼 `-1`을 곱하는 것이 내가 가진 반대라는 단어의 정보인데, `NULL`을 2번 반대하면 `false`가 나온다.
`NULL`은 `boolean`이 아닌데 말이다.

### 요상한 undefined 값의 변화

`undefined`도 참 요상하다

```javascript
!undefined; // true
!!undefined; // false
```

`NULL`처럼 똑같이 당혹스럽다.

### NULL과 undefined

```javascript
console.log(!undefined === !null); // true
console.log(!!null === !!undefined); // true
console.log(undefined === null); // false
console.log(!null === !undefined); // true
```

위의 값들을 보고 있자면 모순(?)되는 느낌, 아니 모순인 점이 느껴진다.

이걸 외우고 개발을 해야 할 것 같진 않지만, 알아는 둬야 할 것 같은 느낌적인 느낌이 든다.

이게 이해가 되는 날이 언젠가는 오겠지 하면서 스킵하고 공부해야겠다.
