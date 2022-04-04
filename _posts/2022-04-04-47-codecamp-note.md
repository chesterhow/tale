---
layout: post
title: '[코드캠프#9] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

Class 형 컴포넌트 예시

``` javascript
import { Component, createRef } from 'react';

// router 통째로 임포트
import Router from 'next/router';
// class는 컴포넌트가 아니다
// component로 만들기 위해 extends Component(리액트에서 제공)
// 아래는 클래스 기능을 가진 컴포넌트

interface IState {
  count: number;
}

export default class CounterPage extends Component {
  inputRef = createRef<HTMLInputElement>();

  // state는 count라는 스테이트 만들기, 컴포넌트로 확장해야 이렇게 사용가능
  state = {
    count: 99,
  };

  // 렌더링 이후 실행, 1번만 실행됨
  // ex) 포커스 깜빡깜빡거리게 할때 사용
  componentDidMount() {
    console.log('마운트됨!!');
    this.inputRef.current?.focus();
  }

  // 리렌더가 될때 마다 실행됨
  componentDidUpdate() {
    console.log('수정되고 다시 그려짐!!');
  }

  // 컴포넌트가 사라지고 난뒤 실행
  // ex) 채팅방 나가기 => api 요청!
  componentWillUnmount() {
    console.log('컴포넌트 사라짐!!');
  }

  // 화살표 함수로 해야.. this가 제대로 bind로 하는 법도 있다.
  onClickCounter = () => {
    console.log(this.state.count);
    // setState : 컴포넌트로 확장해야 이렇게 사용가능
    this.setState((prev: IState) => ({
      count: prev.count + 1,
    }));
    console.log(this.state.count);
  };

  onClickMove() {
    Router.push('/');
  }

  // class는 함수와 달리 return이 없다. 대신 render가 있다.
  // render는 component로 확장해서 가능한 기능
  render() {
    return (
      <div>
        <input type='text' ref={this.inputRef} />
        {/* this : class를 가리킨다 */}
        <div>현재카운트: {this.state.count}</div>
        <button onClick={this.onClickCounter}>카운트 올리기!!</button>
        <button onClick={this.onClickMove}>나가기!!</button>
      </div>
    );
  }
}
```

```javascript
위의 클래스형 컴포넌트를 함수형으로 바꾸기

// 16-03을 함수형으로 바꾸기
import { useEffect, useRef, useState } from 'react';

// router 통째로 임포트
import { useRouter } from 'next/router';
// class는 컴포넌트가 아니다
// component로 만들기 위해 extends Component(리액트에서 제공)
// 아래는 클래스 기능을 가진 컴포넌트

// interface IState {
//   count: number;
// }

export default function CounterPage() {
  const router = useRouter();

  // inputRef = createRef<HTMLInputElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(99);

  // state는 count라는 스테이트 만들기, 컴포넌트로 확장해야 이렇게 사용가능
  // state = {
  //   count: 99,
  // };

  // 1. DID MOUNT
  // // 렌더링 이후 실행, 1번만 실행됨
  // // ex) 포커스 깜빡깜빡거리게 할때 사용
  // componentDidMount() {
  //   console.log('마운트됨!!');
  //   this.inputRef.current?.focus();
  // }

  // useEffect(() => {
  //   console.log('마운트됨');
  //   inputRef.current?.focus();
  // }, []);

  // 2. DidUpdate
  // // 리렌더가 될때 마다 실행됨
  // componentDidUpdate() {
  //   console.log('수정되고 다시 그려짐!!');
  // }

  // 그런데 이건 처음에도 1번 실행됨
  useEffect(() => {
    console.log('수정되고 다시 그려짐!!');
  });

  // 대괄호안에 변수가 바뀔때마다 실행되도록 설정가능. 없으면 뭐가 바뀌든 계속 실행
  // useEffect(() => {
  //   console.log('수정되고 다시 그려짐!!');
  // },[count]);

  // 3. WillUnmount
  // // 컴포넌트가 사라지고 난뒤 실행
  // // ex) 채팅방 나가기 => api 요청!
  // componentWillUnmount() {
  //   console.log('컴포넌트 사라짐!!');
  // }

  // useEffect(() => {
  //   return () => {
  //     console.log('컴포넌트 사라짐!!');
  //   };
  // }, []);

  // 4. DIDMOUNT와 WillUnMOUNT를 합치기
  useEffect(() => {
    console.log('마운트됨');
    inputRef.current?.focus();
    return () => {
      console.log('컴포넌트 사라짐!!');
    };
  }, []);

  // 5. useEffect의 잘못된 사용 예(1. 추가렌더링)
  // useEffect에서 setState를 사용하면 불필요한 랜더링이 발생할수 있어서 권장하지는 않음
  // useEffect(() => {
  //   setCount(10)
  // }, [])

  // 5. useEffect의 잘못된 사용 예(2. 무한루프)
  // useEffect(() => {
  //   setCount(prev => prev+1)
  // },[])

  // 대괄호 : 의존성 배열(dependency array) 대괄호가 있으면 1번만 실행되고 끝난다.

  // 화살표 함수로 해야.. this가 제대로 bind로 하는 법도 있다.
  const onClickCounter = () => {
    // console.log(this.state.count);
    // setState : 컴포넌트로 확장해야 이렇게 사용가능
    // this.setState((prev: IState) => ({
    //   count: prev.count + 1,
    // }));
    // console.log(this.state.count);
    setCount((prev) => prev + 1);
  };

  const onClickMove = () => {
    router.push('/');
  };

  // class는 함수와 달리 return이 없다. 대신 render가 있다.
  // render는 component로 확장해서 가능한 기능
  console.log('나는 언제 실행되게?!!');

  return (
    <div>
      <input type='text' ref={inputRef} />
      {/* this : class를 가리킨다 */}
      <div>현재카운트: {count}</div>
      <button onClick={onClickCounter}>카운트 올리기!!</button>
      <button onClick={onClickMove}>나가기!!</button>
    </div>
  );
}
```

그외 학습내용

`this` : 동적 스코프

java나 C와 다르다. 이를 바꾸기 위해 `화살표 함수`가 나왔다.

lexical this : 고정된 this?

this : `화살표 함수에 있으면 속해 있는 클래스`를 가리킨다

>기본적으로 최신 자바스크립트는 use strict 모드로 작동합니다
use strict 모드에서는 this가 실행되는 환경이 변경될 때, window를 나타내지 않고 undefined를 가리키게 됩니다.
현재 보이시는 화면은 use strict 를 제거하고 실행한 결과입니다.
즉, 우리가 마우스로 클릭했을 때, 키보드를 쳤을 때 등등 this를 실행하는 녀석은 window(기본) 입니다.

>따라서, this가 실행되는 환경이 다르기 때문에 클래스에서는 화살표함수를 사용하거나 bind 명령으로 this를 통일시켜 주셔야합니다


java는 class기반 

javascript는 프로토타입 기반(자바스크립트가 거의 유일하나 class 기반으로 넘어가는 추세)


