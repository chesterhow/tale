---
title: "전자정부 프레임워크+mysql 초기 세팅 시 발생한 오류들 및 처리방법"
description: "전자정부 프레임워크+mysql 처음부터 로컬 서버 올릴 때까지의 시행 착오."
category: 전자정부프레임워크
tags: 전자정부프레임워크
--- 

나는 일단 hello world를 찍어보고 시작하는 편이라, 가이드에 따라 시작해본다. 

## 1. 샘플 소스에 hsql이 없음.......
오늘자 기준으로 전자정부프레임워크의 가장 최신 버젼은 3.7.0이다.
다운로드 후 설치가이드를 따라해봤는데... 가이드에서 메모리 db 역할을할 hsql을 실행하라고 적혀있는데, 실행파일이 없음.......
분명 이렇게 적혀있는데..
> 1. 생성한 프로젝트의 디렉토리에 있는 DATABASE > db 폴더에 있는 runHsqlDB.cmd 파일을 실행시킨다.

참고한 가이드
<a href="https://www.egovframe.go.kr/wiki/doku.php?id=egovframework:dev3.7:clntinstall" target="_blank">설치 가이드</a>
<a href="http://www.egovframe.go.kr/wiki/doku.php?id=egovframework:dev2:imp:dbio_editor:hsqldb_guide" target="_blank">hsql 세팅 가이드</a>

그래서 마리아DB를 설치하여 jdbc 드라이버를 잡고 세팅해보기로 한다.

db를 연동하려면 pom.xml에서 hsql 관련 부분을 지우고 commons-dbcp, mysql-connector-java을 사용한다.

## 2. ojdbc-14.jar를 찾을 수 없음.
pom.xml을 열어 db 라이브러리 관련된 주석을 푸니까 바로 jar를 찾을 수 없다고 나온다. 해당 내용은..

이런 식으로 로컬 경로로 잡혀있음.... ㅡㅡ;
``` xml
<dependency>
    <groupId>ojdbc</groupId>
    <artifactId>ojdbc</artifactId>
    <version>14</version>
    <scope>system</scope>
    <systemPath>${basedir}/src/main/webapp/WEB-INF/lib/ojdbc-14.jar</systemPath> 
</dependency>
```
이것이 과연 정체가 무엇일까.. 지금 다른 에러들 뜨는 것들이 이것을 잡으면 해결이 될까 하여,  
인터넷에 한참 찾아보니 오라클 라이센스 때문에 메이븐 리파지토리에 없어서 오라클 리파지토리를 추가하라함..

그래서 오라클 리파지토리와 라이브러리 설정을 변경해봤지만, 다른 오류들은 지워지지 않는다.

이것은 확실히 오라클 라이브러리일 뿐이군 하고 가뿐히 지우고 넘어간다.


## 3. Class 'org.springframework.jdbc.datasource.DataSourceTransactionManager' not found 오류

DataSourceTransactionManager 클래스를 찾을수 없다.

찾아보니까 내부적으로 같은이름을 참조하는 부분이 있어서 txManager가 아닌 transactionManager로 사용하는 모양이다...

이걸로 세시간 헛고생.. 전자정부 배포하시는 분들은 왜 이 상태로 배포하셨을까 원망스럽다..

context-transaction.xml - 기존
``` xml
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>

<tx:advice id="txAdvice" transaction-manager="txManager">
  <tx:attributes>
    <tx:method name="*" rollback-for="Exception"/>
  </tx:attributes>
</tx:advice>
```

context-transaction.xml - 변경 후
``` xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>

<tx:advice id="txAdvice" transaction-manager="transactionManager">
  <tx:attributes>
    <tx:method name="*" rollback-for="Exception"/>
  </tx:attributes>
</tx:advice>
```

## 마치며..
과연 전자정부 프레임워크를 만드는 분들이 아무것도 없는 환경에서 테스트를 해보고 올린 것일까? 아마도 개발자가 자기 환경에서 자기 멋대로 세팅하고 메뉴얼을 작성한거 같다는 생각이 든다.

메뉴얼과 다른 내용도 있었고 발생할 수 있는 오류들에 대한 설명이 하나도 없어서 삽질을 엄청했다..

이거 그래도 정부에서 지정한 프레임 워크인데 똑똑한 분들이 만드는거 아닌가요?? 그래도 돈받고 하는 건데, 이렇게 만드는 건 아니잖아요?

혹시 관계자가 보신다면 아무것도 없는 환경에서 처음부터 설치를 해보고 메뉴얼을 작성해주시기를 바랍니다...
