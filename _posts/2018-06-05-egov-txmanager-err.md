---
title: "전자정부 프레임워크 초기 세팅 시 DataSourceTransactionManager 클래스를 못찾을때 처리방법"
description: "전자정부 프레임워크에서 Class 'org.springframework.jdbc.datasource.DataSourceTransactionManager' not found (DataSourceTransactionManager 클래스를 찾을수 없을 때) 처리방법."
category: 전자정부프레임워크
tags: 전자정부프레임워크
--- 

JPA에서 내부적으로 같은이름을 참조하기 때문에 txManager가 아닌 transactionManager로 사용한다...

후.. 이걸로 세시간 헛고생.. 전자정부 만드시는 분들은 왜 이렇게 만드셨을까..

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
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>

<tx:advice id="txAdvice" transaction-manager="transactionManager">
  <tx:attributes>
    <tx:method name="*" rollback-for="Exception"/>
  </tx:attributes>
</tx:advice>
```
