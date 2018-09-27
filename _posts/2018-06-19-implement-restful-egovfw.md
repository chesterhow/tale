---
title: 전자정부 프레임워크에서 RESTful 구현
author: jaycee
description: RESTful 개요 및 전자정부 프레임워크에서 RESTful 구현하기(작성중)
tag: reflection.spring,java,전자정부프레임워크
---

## REST란?
Representational State Transfer의 약어로 '명시적 상태 전송'으로 직역할 수 있다. Roy Fielding이 2000년에 처음 공개했으며, 6가지 가이드라인을 따른다. 즉, 표준이 있는 것은 아니고 이렇게 따르라 이말이다.

## REST의 특징

## REST의 6가지 가이드라인
1. Client–server - 클라이언트와 서버 분리
클라이언트와 서버를 분리하여 플랫폼 상관없이 서비스를 이용할 수 있다. 또한 서버단 구조가 단순해져서 확장에 유연하다.

2. Stateless - 무상태
서버에서 각 요청 이해하기 위해 요청에 모든 필수정보들이 담긴다면 컨텍스트 서버의 이점을 활용할 수 없다. 상태(session state)는 클라이언트에만 종속적이어야한다.
> 클라이언트의 상태값 상관없이 처리가 일정해야한다. 이는 http 호출은 독립적일 수 밖에 없는 구조이므로 RESTful의 이점이기도 하지만 http 에 포함된 내용이다.

3. Cacheable - 캐시
응답 데이터를 캐시할 수 있어야한다. 캐시된 데이터는 이후 동일한 요청에 재사용할 수 있다.

4. Uniform interface - 통일된 인터페이스
통일된 인터페이스를 이용하면 모든 시스템 구조는 간결해지고 가독성이 좋아진다. 통일된 인터페이스를 구성하기 위해서 다중의 구조적 가이드를 따라야한다. REST는 네개의 인터페이스 가이드라인이 있다. 자원의 identification, 명시적 자원 조작, 자기 명시적 메시지, 그리고 하이퍼미디어로써 응용프로그램 상태태 표현이다.

5. Layered system - 레이어

The layered system style allows an architecture to be composed of hierarchical layers by constraining component behavior such that each component cannot “see” beyond the immediate layer with which they are interacting.

6. Code on demand (optional) – REST allows client functionality to be extended by downloading and executing code in the form of applets or scripts. This simplifies clients by reducing the number of features required to be pre-implemented.

