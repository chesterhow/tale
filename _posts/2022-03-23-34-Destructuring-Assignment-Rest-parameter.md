---
layout: post
title: '똑똑한 할당 구조분해할당'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## 구조분해할당(Destructuring-Assignment)
`객체`나 `배열`을 `변수`로 '분해’할 수 있게 해주는 특별한 문법을 `구조 분해 할당`(destructuring assignment)이라고 부른다.

배열을 구조분해하는 예시를 통해서 감을 잡아보도록 하겠다.

```javascript
let arr = ["Seoul", "Korea"]
let [city, country] = arr; // 구조분해할당

alert(city); // Seoul
alert(country);  // Korea
```

arr라는 배열의 요소가 구조분해할당 문법을 통해 각각 city와 country에 할당이 된것을 볼 수 있다.
그렇다면 city와 country의 타입은 어떨까? 

```javascript
typeof city
//'string'
typeof country
//'string'
```
배열의 원요소 타입인 string으로 되어 있음을 알수 있었다.

### 구조분해할당 응용
> 1. `쉼표`를 통해 요소 무시하기

```javascript
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// 두 번째 요소는 제외하고(건너뛰고) 할당하기

alert( title ); // Consul
```

>2.우측엔 모든 `이터러블`이 올 수 있습니다.
할당 연산자 우측엔 이터러블이라 불리는 연속되는, 반복되는 객체가 모두 올수 있습니다.

``` javascript
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

>3 `.entries()`로 `객체`의 키와 값을 변수로 분해하여 할당하기

```javascript
let user = {
  name: "John",
  age: 30
};

// 객체의 키와 값 순회하기
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, age:30이 차례대로 출력
}
```

>4. 변수값을 서로 `교환`하기

```javascript
let guest = "Jane";
let admin = "Pete";

// 변수 guest엔 Pete, 변수 admin엔 Jane이 저장되도록 값을 교환함
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane
```



