---
title: 토비의 스프링 3장 템플릿 요약/정리
author: 박종철
category: spring
description: 토비의 스프링 3장 템플릿 요약/정리
---

## 예외처리 기능을 갖춘 DAO

2000년도 중반까지만 해도 jsp에서 DB에 연결하여 쿼리를 실행하기 위해서는 아래와 같이 반복적으로 에러를 처리했었다.

처음부터 스프링 혹은 다른 자바프레임워크의 (ibatis 또는 mybatis)를 사용했다면 아래 소스가 낯설것이다.

하지만 정말 과거에는 그랬다.

간단한 조회 하나만 하려해도 커넥션, 스테이트먼트, 리절트 셋에 대한 선언 및 에러처리까지 해줘야했다.

자칫 잘못 복사해서 저 중 하나의 리소스를 닫지 않아서 메모리 오류 또는 커넥션 풀 오류가 발생한다면 매우 찾기 힘들었을 것이다.

토비의 스프링 챕터3 템플릿에서는 이 것을 개선하면서 JDBC 템플릿이 어떻게 지금의 모습을 갖췄는지 잘 설명되어있다.

이것을 요약정리해본다.

``` java
public void delteAll throw Exception{

  Connection c = null;
  PreparedStatement ps = null;
  Resultset rs = null;
  
  try {
    c = dataSource.getConnection();
    ps = c.preparedStatement("select count(*) from users");
    rs = ps.executeUpdate();    
    rs.next();
    return rs.getInt(1);
    
  } catch (SQLException e) {
    throw e;
  } finally {
      if(rs!= null){ try{ rs.close(); } catch(SQLException){} }
      if (ps != null) { try { ps.close(); } catch (SQLException e) {} }
      if (c != null) { try {c.close(); } catch (SQLException e) {} }
    }
    
  }
  
}
```

## 3.2.2 분리와 재사용을 위한 디자인 패턴 적용
try/catch/finally
