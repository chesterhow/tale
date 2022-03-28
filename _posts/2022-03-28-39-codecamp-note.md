---
layout: post
title: '[코드캠프#8] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

## input의 defaultvalue와 value
- defaultvalue는 최초값, 유저가 바꿀수 있다.
- value는 유저가 바꿀수 없다.
- 제어(controllered) 컴포넌트 : 장문일 경우 느리다


## event 버블링
- 자식에서 부모로 이벤트가 전파 되는 것

## event 캡쳐링
- 부모에서 자식으로 이벤트가 전파 되는 것

event.currentTarget.id
현재 전파된 이벤트의 id를 가져온다

## 클릭이 이상해 > Event bubbling/delegation

## 이미 만들어 놨다고? 땡큐 > library
프레임워크 : antd, material
라이브러리 : 작은 기능들

프레임워크 중의 일부를 임포트 해서 사용할 수 있다.

## 프레임워크 사용 주의사항
- 아이콘에 id를 설정해서 사용하는 경우 > 일단은 현재는 못쓰는 것으로
- CSS를 바꾸고 싶은 경우 emotion을 사용

```javascript
const MyIcon = styled(QuestionCircleOutlined)`
  font-size: 50px;
  color: red;
`;
```
- react-player css도 emotion으로 바꿀수 있지만 width height의 경우에 jsx에 직접 입력





