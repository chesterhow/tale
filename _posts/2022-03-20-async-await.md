---
layout: post
title: 'async / await'
author: 'Nostrss'
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

## Syncronous(동기) and Asyncronous(비동기) 
`동기식` - 프로그램이 진행중 요청한 것에 대해 응답을 받아야만 다음과정이 진행되는 방식 
`비동기식` - 요청에 대한 응답과 상관없이 다음과정이 진행되는 방식

이 애기가 나오는 이유를 설명하자면 내가 이해하기론 아래와 같다
- 자바스크립트는 `싱글 스레드 언어`이다.
- 한번에 1개밖에 처리를 못한다.
- 즉 동기식으로 작동을 한다.
- 하지만 여러가지 이유로 비동기식으로 작동하는 외부 api, 라이브러리를 사용해야하는 경우가 있다. 
- 이 경우 동기 <-> 비동기를 연결해주는 방법이 필요하다. 

### 비동기 함수를 정의하자 async

[async MDN문서 보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
>비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 Promise를 사용하여 결과를 반환합니다. 그러나 비동기 함수를 사용하는 코드의 구문과 구조는, 표준 동기 함수를 사용하는것과 많이 비슷합니다.

먼가 복잡하다. 일단 이해가 되는 것은 이렇다.

- `비동기`로 작동하는 것과 자바스크립트를 연결하려면 `async`를 쓰면 된다.
- 그러면 `Promise`를 반환해준다.

`Promise`는 또 무엇이냐..

[Promise MDN문서 보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

지금은 잘 이해가 안되는데 일단 먼가 데이터를 받아오는 객체 같은 것 같다.

### 비동기를 기다리자 await
async가 사용된 함수 내에서 await을 사용하게 되면 처리(settled)될 때까지 기다리다가 결과를 반환한다고 한다.
[Await MDN문서 보기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)

await은 async 함수 내에서만 사용할 수 있다고 한다.


### 사용방법
```javascript
// 동기 통신
async function 함수명
() {
	await // 서버에 요청하는 코드
}

// 화살표 함수의 경우
const 함수명 = async () => {
	await // 서버에 요청하는 코드
}
```

```javascript
async function handleClickPost(){
		const result = await createBoard({
      variables: {
        aaa: "훈이",
        bbb: "1234",
        ccc: "안녕하세요 훈이에요",
        ddd: "반갑습니다"
        }
      }
    )
		// 결과물 확인하기
		console.log(result)
}

return (
	<button onClick={handleClickPost}>게시물 등록</button>
)
```




