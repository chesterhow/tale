---
layout: post
title: '[코드캠프#3] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---


### 2개의 컴퓨터가 통신하는 방법

- 파일 전송 => FTP
- 간단한 메일 => SMTP
- 텍스트/하이퍼텍스트 => HTTP


### 상태코드

HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 알려줍니다. 응답은 5개의 그룹으로 나누어집니다 

>1. 정보를 제공하는 응답 
>2. 성공적인 응답 
>3. 리다이렉트 
>4. 클라이언트 에러 
>5. 서버 에러. 

[상태코드 종류 더 보러가기](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)


### Rest-API vs GraphQL

Rest-Api
- 주소처럼 생겼다
- axios
- 백엔드에서 주는 정보 그대로 받아야한다.

GraphQL
- 일반함수와 같은이름
- apollo
- 필요한 것만 정보를 받을 수 있다.

### JSON
- 자바스크립트 객체 표기법
- 헤더와 바디로 구성되어 있다

### CRUD
- Creat Read Update Delete
- 일반적으로 하나의 기능에 최소 위의 4가지 기능이 나온다

| 기능 | axios  |  apollo-client |   
|-----|--------|----------------|
| Creat(생성)  | post | mutation  |   
|  Update(수정) | put  | mutation  |   
|  Delete(삭제) | delete  |  mutation |
|  Read(조회) | get  |  query |











