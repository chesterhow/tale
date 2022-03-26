---
layout: post
title: '[코드캠프#7] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

## 타입스크립트 세팅하기

>설치 : yarn add typescript --dev
>설정 : tsconfig.json 파일 생성(기본폴더)
>설치 : yarn add --dev @types/node
>실행 : yarn dev 

> next.js가 tsconfig.json 파일의 내용을 생성해줌 

### 기존 js(리액트)파일들 변경
`container`와 `presenter`는 `.tsx` 확장자
`query`와 `style`은 `.ts`


## 예시
```javascript
export default function Typescriptpage() {
  // 타입추론 : 형식을 지정안해줘도 aaa가 스트링으로 추론
  let aaa = '안녕하세요'
  aaa = 3

  // 타입명시
  let bbb: string = '반갑습니다'
  
  // 문자타입
  let ccc: string
  ccc= '반가워요'
  ccc = 3

  // 숫자타입
  let ddd: number = 10
  ddd = 'asdf'

  // boolean
  let eee: boolean = true

  // array
  let fff: string[] = ['철수',2];
  fff[0] = 0

  let ggg: number[]
  ggg[0] = 0
  
  let hhh: (number | string)[] = ['철수',2]

  // object 객체
  interface Iprofile {
    name: string,
    age: string | number
    school: string
    hobby?: string  //있어도 되고 없어도 되고
  }

  let profile: Iprofile = {
    name: '철수',
    age: 8,
    school : '다람쥐초등학교'
  }

  profile.age = '8'
  profile.school = 10

  //함수타입

  const add = (money1:number, money2:number, unit: string): string => { 
    return money1 + money2 + unit
  }

  
  const result: string =  add(1000, 2000, '원')
  const result2 =  add(1000, 2000, '원')


  return <div>타입스크립트 연습하기</div>
	```


## 얕은 복사(Shallow copy)

```javascript
const obj1 = { a: 1, b: 2};
const obj2 = obj1;

obj2.a = 2
console.log( obj1 ); // {a: 2, b: 2}
```

위의 예시를 보면 할당받은(사본) obj2 객체의 a값을 변경했다.
그런데 obj1의 a의 값이 변경됨을 알 수 있다. 
이것이 얕은 복사인데 객체의 경우 이렇게 직접 대입하는 경우 발생한다.
그 이유는 `참조에 의한 할당` 때문인데 둘이 `같은 메모리 주소`를 같는다고 생각하면 이해가 쉽다.

## 깊은 복사(Deep copy)
이런 경우를 방지 하기 위해서는 깊은 복사를 해야 한다.
그 방법으로는 `커스텀 재귀함수`를 사용하는 것이다.

```javascript
unction deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let copy = {};
  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

const obj = {
  a: 1,
  b: {
    c: 2,
  },
  func: function () {
    return this.a;
  },
};

const newObj = deepCopy(obj);

newObj.b.c = 3;
console.log(obj); // { a: 1, b: { c: 2 }, func: [Function: func] }
console.log(obj.b.c === newObj.b.c); // false
```

### lodash를 이용한 깊은 복사
`lodash` 모듈의 `cloneDeep()` 메소드를 이용하여 객체의 깊은 복사가 가능하다고 한다.

```javascript
const lodash = require("lodash");

const obj = {
  a: 1,
  b: {
    c: 2,
  },
  func: function () {
    return this.a;
  },
};

const newObj = lodash.cloneDeep(obj);

newObj.b.c = 3;
console.log(obj); // { a: 1, b: { c: 2 }, func: [Function: func] }
console.log(obj.b.c === newObj.b.c); // false
```

