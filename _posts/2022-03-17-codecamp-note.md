---
layout: post
title: '[코드캠프#4] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

## 동기와 비동기방식

- 비동기 실행 서버 컴퓨터의 작업이 끝날 때까지 기다리지 않는 통신으로 서버에 요청(등록, 수정, 삭제 등)이 저장될 때까지 기다리지 않고 다른 작업을 진행합니다.

- 이러한 특징 때문에 비동기 실행은 요청들 사이에 서로 기다려 줄 필요가 없을 경우, 여러 가지 요청을 동시에 처리해 줄 때에 사용됩니다.

- 동기 실행: 서버 컴퓨터의 작업이 끝날 때까지 기다린 후 다음 작업을 실행하는 통신입니다.

## 비동기 통신

```javascript
function 함수이름() {
  const data = axios.get('https://koreanjson.com/posts/1')
  console.log(data) // Promise
}
```

`step1` : URL로 부터 정보를 요청

`step2` : 정보를 받기 전에 data에 값을 저장

`step3` : `console.log(data)`에 아직 정보가 없기 때문에 promise라고 나온다

> `axios`는 비동기로 작동하게 도와준다

### 동기 통신

```javascript
async function 함수이름() {
  const data = await axios.get('https://koreanjson.com/posts/1')
  console.log(data) // {id: 1, title: "정당의 목적이나 활동이 ...", ...}
}
```

`step1` : URL로 부터 정보를 요청

`step2` : 정보를 받을 때까지 기다린다(`await`)

`step3` : 정보를 수신

`step4` : 다음 명령어 라인 실행

> async를 써야 await을 쓸수 있다.

## 호이스팅(Hoisting)

```javascript
console.log(child)
var child = '철수'

var child = undefined // TDZ teampral dead zone
// const let도 호이스팅은 일어나지만 TDZ존에 접근이 안되서 에러가 발생한다.

console.log(child)
child = '철수'
```

함수도 호이스팅이 발생한다

```javascript
hello()

function hello() {
  console.log('안녕하세요')
}
```

방지하기 위해서는 `함수 선언식` 또는 `화살표 함수`를 쓰면 된다

```javascript
hello2()

const hello2 = () => {
  console.log('안녕하세요')
}
```

중복 선언까지 된다

```javascript
function hello(){
console.log('1번째 hello')
}

function hello(){
console.log('2번째 hello')
}

hello()
2번째 hello

const hello = > (){
console.log('1번째 hello')
}

const hello = (){
console.log('2번째 hello')
}
```

> 순수 자바스크립트에서는 중복선언이 가능
> 단, next.js에서는 자체적으로 중복선언을 막는 기능이 있다

## React에서 graphQL 사용을 위해 apollo 세팅하기

### apollo client 설치 방법

1. 터미널에 설치할 `프로젝트`에서 아래 커맨드 실행

- [apollo 사이트 바로가기](https://www.apollographql.com/)

```
npm install @apollo/client graphql
```

2. `package.json`에 설치가 되어 있는지 확인

```json
"dependencies": {
    "@apollo/client": "^3.5.10",
    .
    .
```

### 설치한 apollo client 사용 세팅하기

1. 프로젝트의 `app.js`에 아래처럼 세팅한다

```javascript
import '../styles/globals.css'
import { ApolloClient } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: 'http://backend06.codecamp.co.kr/graphql',
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  )
}

export default MyApp
.
.

```

2. `index.js`에 임포트 하기

```javascript
import { useMutation, gql } from '@apollo/client'
```
