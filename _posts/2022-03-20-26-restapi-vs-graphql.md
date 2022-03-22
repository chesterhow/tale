---
layout: post
title: 'Rest-Api VS GraphQl'
author: 'Nostrss'
comments: true
tags: api rest graphql
excerpt_separator:
sticky:
hidden:
---

## API(Application Programming Interface)
흔히 말하는 컴퓨터와 인간을 연결시키는 `사용자 인터페이스(UI)`와는 다르게, `API`는 `컴퓨터나 소프트웨어`를 서로 연결한다. 내가 지금 공부하는 프론트쪽에서는 주로 클라이언트와 서버와의 연결을 뜻한다고 보면 될 것 같다.


### API와 CRUD
예전에 기획 일을 할 때도 동일하게 느꼈던 내용이다. 
개발을 할때도 어떤 하나의 기능에 일반적으로 최소 4종의 api가 필요하다고 생각하고 작업을 하면 될 것 같다.

`CREAT` : 최초 생성 api ex) 게시글 작성

`READ` : 조회 api ex) 게시글 조회

`UPDATE` : 수정 api ex) 게시글 수정

`DELETE` : 삭제 api ex) 게시글 삭제

### API 통신 방식 비교(REST VS GraphQL)


| 기능 | `Rest`  |  `GraphQL` |   
|-----|--------|----------------|
| 함수이름  | URL형태 | 일반적인 함수 형태  |   
| 함수이름예시 | www.naver.com/board/1  | board(1)  |   
| Data 전달방식 | 전체 전달  | 선택 전달 가능 |
| 라이브러리,프레임워크 | `axios`  | `apollo` |


`GraphQL`이 아무래도 늦게 나온 방식이라 이점이 있긴하다. 하지만 `Rest-Api`가 그동안 워낙 많이 사용되어 왔기 때문에 둘다 사용하는 방법을 공부해두어야 할 것 같다.
지금까지 회사를 다니면서 `GraphQL`을 사용하는 회사는 다녀본적이 없었는데, 결국 둘다 할 줄 알아야 할 것 같다.

### axios와 apollo 비교

| 기능 | `axios`  |  `apollo-client` |   
|-----|--------|----------------|
| Creat(생성)  | post | mutation  |   
|  Update(수정) | put  | mutation  |   
|  Delete(삭제) | delete  |  mutation |
|  Read(조회) | get  |  query |
|  Api 연습 | `postman`  |  `playground` |
|  Api 명세서 | `swagger`  |  `playground` |


기존에 [apidoc](https://apidocjs.com/)을 주로 쓰는 회사들을 다녔는데 이제보니 이것도 swagger처럼 Rest-api 명세서를 만드는 툴인듯 하다.












