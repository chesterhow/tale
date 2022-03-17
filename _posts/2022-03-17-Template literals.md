---
layout: post
title: '[JS] Template literals'
author: 'Nostrss'
comments: true
tags: javascript
excerpt_separator:
sticky:
hidden:
---

## Template literals(템플릿 리터럴)

[MDN 공식문서 바로가기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

`템플릿 리터럴`.. 먼가 이름만 들어도 먼가 거부감이 느껴지는 단어이다.
그래서 위의 링크의 문서를 자세히 읽어봤는데, 이미 내가 사용해본적이 있던 문법(?)이었다.

우리말로 풀어 쓰기가 조금 어려운데 예를 들어서 정리를 해봤다.

```javascript
const firstWord = '템플릿';
const secondWord = '리터럴';

console.log('이것은' + ' ' + firstWord + ' ' + secondWord + ' 입니다');

//결과 이것은 템플릿 리터럴 입니다
```

위의 코드를 `템플릿 리터럴`을 사용해서 다시 표현해보면 아래와 같다

> 템플릿 리터럴 사용시

```javascript
const firstWord = '템플릿';
const secondWord = '리터럴';

console.log(`이것은 ${firstWord} ${secondWord} 입니다`);

//결과 이것은 템플릿 리터럴 입니다
```

똑같이 스트링을 표현하는데 그 표현 방식에 차이가 좀 있는 것 같다.

### 리터럴 템플릿 사용시 주의사항

#### 1. 백틱을 사용한다.

- `(백틱)과 '(작은따움표)` 모양의 차이가 보이는가? 미세하지만 모양에 다소 차이가 있다.
- 백틱은 주로 키보드 숫자 1 왼쪽에 위치하는 기호이다
- 리터럴 템플릿을 사용할 때는 꼭 백틱으로 스트링 영역을 감싸줘야 한다. 백틱이 있어야 여기서부터는 리터럴 템플릿이 시작된다고 알 수 있게 된다.

#### 2. 중간에 표현식을 사용할때는 ${expression} 형태로 넣어준다

```
console.log(`이것은 ${firstWord} ${secondWord} 입니다`)
```

다시 한번 예시를 보면 `${firstWord}`, `${secondWord}` 표현식이 들어간 자리에 미리 할당에둔 변수의 스트링값이 표현 되게 된다.

#### 3. 멀티라인 표현 방법의 차이

- 일반적인 멀티라인 표현 방법

```javascript
console.log("string text line 1\n"+"string text line 2");

//결과
string text line 1
string text line 2

```

- `템플릿 리터럴` 사용시 멀티라인 표현 방법

```javascript
console.log(`string text line 1
string text line 2`);
```

차이를 눈치 챘는가? 템플릿 리터럴에서는 `\n` 대신에 `엔터`로 코드에서 개행처리를 하면 바로 줄바꿈이 된다.

알아두면 텍스트를 스트링으로 표현할 때 유용할 것 같다.
