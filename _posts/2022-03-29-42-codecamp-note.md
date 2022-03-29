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


`4`씩 오르는 카운터를 `useState`를 이용해서 만들어보자

``` javascript
import { useState } from 'react';

export default function StatePage() {
  const [count, setCount] = useState(0);
  const onClickCount = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <div>현재 카운트 : {count}</div>
      <button onClick={onClickCount}>카운토 올리기</button>
    </div>
  );
}
```

- 여기서 아래의 태그들은 StatePage 함수가 끝나야 렌더링이 된다
- 임시저장소는 함수가 끝나기 전에 state에 저장하고 있다.
- 그리고 간단히 진행되는 과정을 살펴보면 아래와 같다.

- 처음 버튼 클릭 시
  >count = 0,  현재 count : 0, 임시저장 count : 1

- 두번 버튼 클릭 시
  >count = 0,  현재 count : 0, 임시저장 count : 1

   >count = 0,  현재 count : 0, 임시저장 count : 1

- 세번 버튼 클릭 시

  >count = 0,  현재 count : 0, 임시저장 count : 1

  >count = 0,  현재 count : 0, 임시저장 count : 1

  >count = 0,  현재 count : 0, 임시저장 count : 1

- 네번 버튼 클릭 시

  >count = 0,  현재 count : 0, 임시저장 count : 1

  >count = 0,  현재 count : 0, 임시저장 count : 1

  >count = 0,  현재 count : 0, 임시저장 count : 1
  
  >count = 0,  현재 count : 0, 임시저장 count : 1

- count = 1

이런식이라서 count가 1씩 밖에 안오른다

### prev 사용 시

```javascript
import { useState } from 'react';

export default function StatePrevPage() {
  const [count, setCount] = useState(0);
  const onClickCount = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div>현재 카운트 : {count}</div>
      <button onClick={onClickCount}>카운토 올리기</button>
    </div>
  );
}
```
이렇게 prev를 사용한 경우에는 4씩 오르게 된다.

prev는 임시저장소에 있는 count 값을 불러와서 계산을 하기 때문에 가능하다

>count = 0,  현재 count : 0, 임시저장 count : 1

>count = 0,  현재 count : 0, 임시저장 count : 2

>count = 0,  현재 count : 0, 임시저장 count : 3

>count = 0,  현재 count : 0, 임시저장 count : 4

count = 4


