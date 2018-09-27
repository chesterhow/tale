---

title: 환경별로 배포 설정 다르게 하는 방법들 정리
description: 환경별로 배포 설정 다르게 하는 방법들 정리
category: spring
tags: spring,maven,ant

---

아래와 같이 크게 세가지 방법이 있고, 빌드툴을 이용할 때는 빌드 툴에 따라 약간의 차이가 있다.

1. 프로그램을 이용
 spring profile 을 이용한다.(스프링 3.1부터 지원)  

2. 설정파일을 버젼 관리에서 제외
 개발자들마다 별도로 로컬 설정파일을 사용한다.  

3. 빌드툴 이용
기본적으로 빌드 시 파라미터를 붙여서 빌드한다. (예:ant build.xml -Denv_var=dev...)
  - ant: build.xml(배포 스크립트) 에서 컴파일 전에 xml이나 property파일을 해당 환경의 설정파일로 덮어씌워 복사한다.
  - maven: profile을 이용한다.
