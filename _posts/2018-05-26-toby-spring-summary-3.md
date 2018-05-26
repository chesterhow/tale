---
title: 토비의 스프링 3장 템플릿 요약/정리
author: 박종철
category: spring
description: 반복되는 소스들을 개선하면서 JDBC 템플릿이 어떻게 지금의 모습을 갖췄는지 설명있는 챕터3을 요약해본다.
---

## 예외처리 기능을 갖춘 DAO

웹개발을 처음 시작했었던 2000년도 중반까지만 해도 jsp에서 DB에 연결하여 쿼리를 실행하기 위해서는 아래와 같이 반복적으로 에러를 처리했었다.

처음부터 스프링 혹은 다른 자바프레임워크의 (ibatis 또는 mybatis)를 사용했다면 아래 소스가 낯설것이다.

하지만 정말 과거에는 그랬다.

간단한 조회 하나만 만드려해도 커넥션, 스테이트먼트, 리절트 셋에 대한 선언 및 에러처리까지 해줘야했다.

만드는 것도 손이 너무 많이 갈 뿐더러, 자칫 잘못 복사해서 저 중 하나의 리소스를 닫지 않아서 메모리 오류 또는 커넥션 풀 오류가 발생한다면 매우 찾기 힘들었을 것이다.

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
### 개선점
변하는 부분과 변하지 않는 부분을 구분하고, 변하지 않는 부분을 인터페이스로 구현하여 DI한다.

위 소스에서 본다면, try/catch/finally절과 객체 선언 부분은 변하지 않는 부분이다.

이것을 공통부분으로 쓰고 쿼리 처리가 변하는 것이므로 쿼리 처리 부분을 인터페이스로 분리하여 의존성 주입을 한다.

### 컨텍스트 소스
``` java
public void jdbcContextWithStatementStrategy(StatementStrategy stmt) throws SQLException {
  Connection c = null;
  PreparedStatement ps = null;

  try {
    c = dataSource.getConnection();

    ps = stmt.makePreparedStatement(c);

    ps.executeUpdate();
  } catch (SQLException e) {
    throw e;
  } finally {
    if (ps != null) { try { ps.close(); } catch (SQLException e) {} }
    if (c != null) { try {c.close(); } catch (SQLException e) {} }
  }
}
```

### 클라이언트 소스 - deleteAll
``` java
public void deleteAll() throws SQLException{
  StatementStrategy st = new deleteAllStatement();
  jdbcContextWithStatementStrategy(st);
}
```

### 인터페이스 구현 소스 - deleteAll
``` java
public void deleteAllStatement() implements StatementStrategy {
  public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
            return c.prepareStatement("delete from users");
  }
}
```

### 클라이언트 소스 - add
``` java
public void add(User user) throws SQLException{
  StatementStrategy st = new AddStatement(user);
  jdbcContextWithStatementStrategy(st);
}
```

### 인터페이스 구현 소스 - addStatement
``` java
public void addStatement(final User user) throws SQLException {
  public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
    PreparedStatement ps = c.prepareStatement("insert into users(id, name, password) values(?,?,?)");
    ps.setString(1, user.getId());
    ps.setString(2, user.getName());
    ps.setString(3, user.getPassword());
    return ps;
  }
}
```

## 3.3 JDBC 전략 패턴의 최적화
### 3.3.2 전략과 클라이트의 동거#1 - 로컬 클래스를 이용한 소스 개선
#### 개선점
- 클래스가 너무 많이 생성되므로 통합한다. 로컬클래스를 이용하여 클래스를 하나로 처리한다. 이번 경우에는 add와 addStatement를 하나의 메소드로 묶는다. 클래스의 갯수가 5개에서 3개로 줄어들었다.
- 멤버변수 user를 같은 클래스안에서 사용할 수 있음므로 메소드간 user 오브젝트를 전달해주지 않아도 된다.

#### 로컬 클래스란?
로컬 변수를 선언하듯 클래스나 메소드 내에 클래스를 선언하는 것. 자바에서 기본적으로 허용하는 문법이다. 이번 경우에는 add 메소드 내에 StatementStrategy 인터페이스를 구현한다.

로컬 변수를 사용함으로써 장점으로는..
- 결합도가 강한 경우 사용하면 불필요한 클래스 파일 생성을 막을 수 있다.
- 가독성이 향상된다.
- 변수를 공유해서 사용하므로 변수가 줄어든다.
그런데 개인적으로는 익숙치는 않아서 가독성이 좋아질 것 같진 않다.

#### 소스 코드
``` java
public void add(User user) throws SQLException{
  class AddStatement implements StatementStrategy{
    User user;
    
    public AddStatement(final User user){
      this.user = user;
    }
    public PreparedStatement makePreparedStatement(Connection c) throws SQLException{
      PreparedStatement ps = c.prepareStatement("insert into users(id, name, password) values(?, ?, ?)");
      ps.setString(1, user.getId());
      ps.setString(2, user.getName());
      ps.setString(3, user.getPassword());
      
      return ps;
    }
  }
  
  StatementStrategy st = new AddStatement(user);
  jdbcContextWithStatementStrategy(st);
}
```

### 3.3.2 전략과 클라이트의 동거#2 - 익명 내부 클래스를 이용한 소스 개선
#### 개선점
- 익명 내부 클래스를 이용하여 구현체(implements) 클래스 선언도 제거하여 소스를 더욱 간결하게 만든다.

#### 익명 내부 클래스란?
- 이름을 갖지 않은 클래스로, 클래스선언과 오브젝트 생성이 결합된 형태로 만들어진다.
- 딱 한 번만 사용 하는 클래스의 경우, 굳이 따로 담아둘 필요가 없다. 이런 클래스는 익명 내부 클래스를 사용하면 소스를 더욱 간결하게 작성할 수 있다.
- new 인터페이스이름(){클래스 본문}; 문법으로 사용한다.
- 이번 예제의 경우, 떨어져 있었던 StatementStrategy st = new AddStatement(user), jdbcContextWithStatementStrategy(st)이 하나의 메소드로 녹아있는 것을 볼 수 있다.

``` java
public void add(final User user) throws SQLException {
  jdbcContextWithStatementStrategy(
      new StatementStrategy() {			
        public PreparedStatement makePreparedStatement(Connection c)
        throws SQLException {
          PreparedStatement ps = 
            c.prepareStatement("insert into users(id, name, password) values(?,?,?)");
          ps.setString(1, user.getId());
          ps.setString(2, user.getName());
          ps.setString(3, user.getPassword());

          return ps;
        }
      }
  );
}
```

## 3.4 컨텍스트와 DI
### 개선점
- 다른 DAO에서도 사용할 수 있도록 소스를 개선한다. 위 소스 같은 경우 user에 관련되어 하드코딩되어있다. 
예를 들어, 앞으로 group, office 등 추가적으로 모델이 추가될 때, 그 때마다 jdbcContextWithStatementStrategy 클래스를 생성해야한다.
- 반복되는 jdbcContextWithStatementStrategy를 분리한다. 변경되는 UserDao에서 jdbcContext를 DI받아 사용한다. 
- 이 구조라 가정할 때 GroupDao를 만든다고하면 GroupDao에서 jdbcContext를 간단하게 DI받아 사용할 수 있다.

### JdbcContext 소스 코드
``` java
public class JdbcContext {
	DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	public void workWithStatementStrategy(StatementStrategy stmt) throws SQLException {
		Connection c = null;
		PreparedStatement ps = null;

		try {
			c = dataSource.getConnection();

			ps = stmt.makePreparedStatement(c);
		
			ps.executeUpdate();
		} catch (SQLException e) {
			throw e;
		} finally {
			if (ps != null) { try { ps.close(); } catch (SQLException e) {} }
			if (c != null) { try {c.close(); } catch (SQLException e) {} }
		}
	}
}
```

### UserDao 소스 코드
``` java
public class UserDao {
	private DataSource dataSource;
		
	public void setDataSource(DataSource dataSource) {
		this.jdbcContext = new JdbcContext();
		this.jdbcContext.setDataSource(dataSource);

		this.dataSource = dataSource;
	}
	
	private JdbcContext jdbcContext;
	
	public void add(final User user) throws SQLException {
		this.jdbcContext.workWithStatementStrategy(
				new StatementStrategy() {			
					public PreparedStatement makePreparedStatement(Connection c)
					throws SQLException {
						PreparedStatement ps = 
							c.prepareStatement("insert into users(id, name, password) values(?,?,?)");
						ps.setString(1, user.getId());
						ps.setString(2, user.getName());
						ps.setString(3, user.getPassword());
						
						return ps;
					}
				}
		);
	}

	public void deleteAll() throws SQLException {
		this.jdbcContext.workWithStatementStrategy(
			new StatementStrategy() {
				public PreparedStatement makePreparedStatement(Connection c)
						throws SQLException {
					return c.prepareStatement("delete from users");
				}
			}
		);
	}
}
```

## 3.5 템플릿과 콜백
### 개선점
- prepareStatement("쿼리")부분도 개선해본다. 이 부분을 보면 prepareStatement는 계속해서 반복되며, **쿼리**부분만 변경이 된다는 것을 알 수 있다.

### 변하는 부분과 변하지 않는 부분 분리
아래와 같이 두가지로 분리하여 생각해볼 수 있다.
#### deleteAll 클래스
``` java
public void deleteAll() throws SQLException {//변하는 부분
		executeSql("delete from users");
	}
```
#### executeSql 클래스
``` java
public void executeSql(final String query) throws SQLException {//변하지 않는 부분
  this.jdbcContext.workWithStatementStrategy(
    new StatementStrategy() {
      public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
        return c.prepareStatement(query);
      }
    }
  );
}	
```

### 변하는 부분과 변하지 않는 부분 재결합
아래와 같이 JdbcContext에 공통된 반복부분을 결합시킨다. 정말 집요하게 리팩토링한다..

아래의 JdbcContext와 같은 방식으로 JdbcTemplate이 동작한다. 오버라이드와 제너릭을 사용하면 쿼리 결과를 List로 받거나, 다양한 모델을 쿼리의 파라미터로 집어넣을 수 있다.

#### deleteAll 클래스
``` java
public void deleteAll() throws SQLException {//변하는 부분
		executeSql("delete from users");
	}
```
#### JdbcContext 클래스
``` java
public class JdbcContext {
	...
	public void executeSql(final String query) throws SQLException {
		workWithStatementStrategy(
			new StatementStrategy() {
				public PreparedStatement makePreparedStatement(Connection c)
						throws SQLException {
					return c.prepareStatement(query);
				}
			}
		);
	}	
  ...
}
```

## 3.6 스프링의 JdbcTemplate
### 개선점
- 위의 과정으로 JdbcTemplate의 동작과정을 알아봤다. 이번에는 jdbcTemplate를 DI받아서 사용하면된다. 
- 가장 앞에 있는 소스와 비교해본다면 확연히 달라진 것을 알 수 있다.

### 최종 UserDao
``` java
public class UserDao {
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	private JdbcTemplate jdbcTemplate;
	
	private RowMapper<User> userMapper = 
		new RowMapper<User>() {
				public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				User user = new User();
				user.setId(rs.getString("id"));
				user.setName(rs.getString("name"));
				user.setPassword(rs.getString("password"));
				return user;
			}
		};

	
	public void add(final User user) {
		this.jdbcTemplate.update("insert into users(id, name, password) values(?,?,?)",
						user.getId(), user.getName(), user.getPassword());
	}

	public User get(String id) {
		return this.jdbcTemplate.queryForObject("select * from users where id = ?",
				new Object[] {id}, this.userMapper);
	} 

	public void deleteAll() {
		this.jdbcTemplate.update("delete from users");
	}


}
```
