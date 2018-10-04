---
layout: post
title:  "마이크로서비스 아키텍처"
author: "Sangbeom"
categories:
  - 서버
tags:
  - server
  - microservicearchitecture
---
## Monlithic Architecture
* 하나의 서버에 모든 비지니스 로직이 들어가 있는 형태
* 하나의 중앙집중화된 데이타 베이스에 모든 데이터가 저장
* 단점
   * 여러개의 기술을 혼용하기 어려움
   * 배포 및 재기동 시간이 오래걸림
   * 수정이 용이하지 않음
* 장점
  * 기술 단일화
  * 관리 용이성


## Microservice Architecture
* 시스템을 여러개의 독립적인 서비스로 나누고 이 서비스들을 조합하여 기능을 제공하는 아케텍처 디자인 패턴
* SOA의 경량화 버전
* 서비스들 끼리는 프로토콜로 통신 (HTTP 등)
* 장점
  * 서비스 각각이 리소스의 필요에따라 스케일링이 가능


참고:
[Using Containers to Build a Microservices Architecture](https://medium.com/aws-activate-startup-blog/using-containers-to-build-a-microservices-architecture-6e1b8bacb7d1)
