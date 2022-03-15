---
layout: post
title: '[코드캠프#2] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

<hr>

- http://127.0.0.1:3004/

- http://localhost:3004/

  - 위 2개 주소는 같은 주소이다

<hr>

- 사이트이름 : `npmtrends`

- https://www.npmtrends.com/

<hr>

- 리액트의 핵심 `component`

- 리액트는 `component`들의 조립식이다.

- 기존에도 가능했다. 단순 복붙. 하지만 근본적으로 차원이 다르다.

- 필요한 곳에 `import`해서 사용가능하다

- `UI`의 `재사용성`이 높다

<hr>

```javascript
//함수형컴포넌트

export default function BoardsNewPage(){ //페이지컴포넌트
    return (
        <Wrapper>
        <Title>게시판 등록</Title>
```

> 클래스형 컴포넌트 vs 함수형 컴포넌트

- 함수형이 더 최신 문법
- 클래스형은 서서히 사라진다
- 하지만 레거시로 클래스형이 남아 있을수 있기 떄문데 클래스형 컴포넌트도 알아야 한다.
- 두개가 동시에 공존이 가능하다.

> 함수형 컴포넌트가 나오게 된 계기

- `react-hooks` 가 나오게 되면서(use로 시작하는 것들..)

## Hooks

state 컴포넌트 전용변수

useState

const[state(변수명),setState(변수바꾸기 함수)] = useState('철수')

복잡하게 왜 useState를 쓰는건가?
> state만 이해하면 document.getElementById 등을 안써도 된다.


> 주의
``` javascript
return (
    // react에서 내보낼때 꼭 태그를 묶어주고 내보내야한다.
    <div>
      <div id="count">0</div>
      <button onClick={counter}> 카운트 올리기!!</button>
    </div>
  );
```