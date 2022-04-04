---
layout: post
title: '특정 Dom에 접근해보자 useRef'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

[useRef 공식문서 바로가기](https://ko.reactjs.org/docs/hooks-reference.html)
`JavaScript`에서 우리는 특정 `DOM` 을 선택해야 하는 상황에 `getElementById`, `querySelector` 같은 함수를 사용해서 DOM을 선택하여 조작합니다.

리액트에서도 가끔 이런 상황이 발생하는데 그때 리액트에서는 `ref` 라는 것을 사용한다. 그리고 함수형 컴포넌트에서 ref를 사용해야하는 경우에는 `useRef`라는 `Hook`함수를 사용한다.

### `useRef` 사용 예시
```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  // 타입스크립트에서는 아래처럼 사용
  //  const inputRef = useRef<HTMLInputElement>(null);


  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
- `input`태그의 `ref`는 `inputEl`이 바인딩 되어 있다.
- 그리고 버튼을 클릭할 경우 `onButtonClick` 함수가 실행된다.
- onButtonClick 함수에서 `input`태그에 포커싱이 되도록 처리한다.

주의사항
- `useRef`는 내용이 변경될 때 그것을 알려주지는 않는다. 즉 `.current 프로퍼티를 변형`하는 것이 `리렌더링`을 발생시키지는 않는다.





