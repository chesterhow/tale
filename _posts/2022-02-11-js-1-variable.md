---
layout: post
title: "[JS #1] 독학중 변수"
author: "Nostrss"
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

얼마전 부터 `제로베이스` 사이트에서 동영상 강의를 보고 있다.

[제로베이스 JavaScript 완전 정복](https://zero-base.co.kr/category_dev_camp/JS_challenge)

나는 동영상 강의로 공부를 하는 것에 익숙하지 않은 세대(?)이다. 그러다 보니 학습이 되고 있는 건지 스스로에게 의구심이 들었다. 그리고 강사님이 은연중에 자신의 경험에서 비롯한 애기를 하는 경우가 있다. 노하우 라고 생각을 하는데 영상만 보고 잊어 버릴것 같았다.

그래서 복습 겸 개인적으로 기억하고 싶은 부분만 포스팅을 해놔야 겠다.

# 변수

변수는 아래와 같이 선언하고 할당 할 수 있다

### 변수의 선언과 할당

```javascript
let lang; //선언
lang = "JS"; //할당
let lang2 = "JavaScript"; //선언 + 할당
```

변수 선언시 의도한 바가 아니면 선언과 동시에 할당하는 방법이 좋다고 한다.

### 복합 할당 연산자

```javascript
// 비추천 작성법
let count = 0;
count += 1; // count = 1
```

`+=` 이와 같이 표현되는 것을 복합 할당 연산자라고 하는데 다른 사람이 보기에 이해하기 어렵고 실수를 유발하기 쉽다. 그래서 아래 처럼 작성하는게 코드가 잘 읽히고 예상하기 쉽다고 한다

```javascript
// 추천 작성 방식
let count = 0;
count = count + 1; // count = 1
```

> 코드는 가급적 다른 누군가가 봤을때 잘 읽히도록 최대한 풀어서 작성을 하는 것이 좋을 것 같다.
