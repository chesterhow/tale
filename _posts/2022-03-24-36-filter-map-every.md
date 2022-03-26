---
layout: post
title: '똑똑한 배열 메서드들'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## .filter()
[filter MDN 문서 바로보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

`filter()` 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 `새로운 배열`로 반환한다.

### 구문
```javascript
arr.filter(callback(element[, index[, array]])[, thisArg])
```
구문 설명이 좀 복잡한데.. 예시로 이해하는게 더 빠를 것 같다.

```javascript
function isBigEnough(value) {
  return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered 는 [12, 130, 44]
```

```javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```
아직 콜백 함수에 대해 익숙하지 않아서 위의 예시구문을 참고로 자주 쓰면서 익혀야 할 듯 하다.

## .map()
[map MDN 문서 바로보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

`map`은 for문 없이 배열의 요소에 `반복문`처럼 접근을 가능하게 하는 메서드로 많이 사용된다.

```javascript
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

## .every()
[every MDN 문서 바로보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

`filter`와 비슷해보이지만 조금 다른 메서드이다. 배열안의 모든 요소가 `판별함수`를 통과 했는지 확인하며 `Boolean` 값을 반환한다.

```javascript
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```




