---

title: 환경별로 배포 설정 다르게 하는 방법들 정리
description: 환경별로 배포 설정 다르게 하는 방법들 정리
category: spring
tags: spring,maven,ant

---

1. 프로그램을 이용
 spring profile 을 이용한다.(스프링 3.1부터 지원)

2. 설정파일을 버젼 관리에서 제외
 개발자들마다 별도로 로컬 설정파일을 사용한다.

3. 빌드툴 이용
 1. ant: build.xml(배포 스크립트) 에서 컴파일 전에 xml이나 property파일을 삭제하는 부분을 추가한다.
 2. maven: profile을 이용한다.
 
