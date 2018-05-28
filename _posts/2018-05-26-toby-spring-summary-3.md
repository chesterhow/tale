---
title: 토비의 스프링 3장 템플릿 정리
author: jaycee
category: spring
tag: toby
description: 반복되는 소스들을 개선하면서 JDBC 템플릿(JdbcTemplate)이 어떻게 지금의 모습을 갖췄는지 알아본다.
---

## 예외처리 기능을 갖춘 DAO

웹개발을 처음 시작했었던 2000년도 중반까지만 해도 jsp에서 DB에 연결하여 쿼리를 실행하기 위해서는 아래와 같이 반복적으로 에러를 처리했었다.


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

처음부터 스프링 혹은 다른 자바프레임워크의 (ibatis 또는 mybatis)를 사용했다면 위 소스가 낯설것이다.

하지만 정말 과거에는 그랬다.

간단한 조회 하나만 만드려해도 커넥션, statement, resultSet에 대한 선언은 물론 에러처리까지 해줘야했다.

만드는 것도 손이 너무 많이 갈 뿐더러, 자칫 잘못 복사해서 저 중 하나의 리소스를 닫지 않아서 메모리 오류 또는 커넥션 풀 오류가 발생한다면 매우 찾기 힘들었을 것이다.

토비의 스프링 챕터3 템플릿에서는 이러한 노가다를 개선하면서 JDBC 템플릿(JdbcTemplate)이 어떻게 지금의 모습을 갖췄는지 잘 설명되어있다.

이것을 요약정리해본다.

## 3.2.2 분리와 재사용을 위한 디자인 패턴 적용
### 개선점
- 변하는 부분과 변하지 않는 부분을 구분하고, 변하는 부분을 인터페이스로 구현하여 DI한다.
- 위 소스에서 본다면, try/catch/finally절과 객체 선언 부분은 변하지 않는 부분이다.
- 이것을 공통부분으로 쓰고 쿼리 처리가 변하는 것이므로 쿼리 처리 부분을 인터페이스로 분리하여 의존성 주입을 한다.

### 전략 패턴이란?
변하는부분/아닌 부분을 분리하여 변하는 부분을 인터페이스로 만들어 추상화하는 것을 전략 패턴이라고한다. 이 인터페이스를 전략 인터페이스라고 한다.
전략 패턴의 동작 방식은 
1. 클라이언트에서는 전략을 선택, 생성(Autowired)하여 컨텍스트에 제공한다.
2. 컨텍스트는 전략을 전달받고 추상화된 인터페이스를 통해 위임하여 실행하는 방식이다.

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
        public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
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
- 지금까지 개선한 jdbcContext를 다른 DAO에서도 사용할 수 있도록 소스를 개선한다. 위 소스 같은 경우 user에 종속(하드코딩)되어있다. 
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
					public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
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
				public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
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
				public PreparedStatement makePreparedStatement(Connection c) throws SQLException {
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

## 마치며..
다음과 같은 순서로 원시적인 소스에서 JdbcTemplate 동작방식을 알아봤다.
1. DI할 수 있도록 변하지 않는 부부은 콘텍스트로 변하는 부분은 클라이언트, 인터페이스 구현체로 분리. **이러한 변하는 것을 인터페이스로 만들어 위임시키는 방법을 전략 패턴이라한다.**
2. 로컬 클래스를 사용하여 클래스 갯수 줄이기.
3. 익명 내부 클래스를 이용하여 소스 간결하게 정리.
4. 여기까지 정리된 소스에서 다른 DAO에서 JdbcContext로 DI받아 사용할 수 있도록 수정한다. 공통부분은 JdbcContext로, 클라이언트에서는 JdbcContext를 DI받아서 사용. (이는 전략 패턴이 아닌 것 주의.)
5. DB - 웹 어플리케이션 간 작업은 일정하다. select, update, delete, insert 정도.. 이것 또한 jdbcContext에 기능을 구현하고, 클라이언트는 쿼리만을 파라미터로 넘긴다. 제너릭과 오버라이드를 통해 다양한 모델(VO)을 쿼리의 파라미터로 보내거나, 조회결과로 List<Object> 형태로도 수신 받을 수 있다.

## 토비의 스프링에 대해..
토비 스프링은 다른 책과 다르게 스프링과 객체지향의 원리와 지향하는 것에 대해 심도있게 쓰여있다.

놀라운 것은 심도가 있다고해서 책이 결코 어려운 것은 아니다.

시중의 다른 스프링 서적에서 스프링을 기술할 때 스프링은 거대한 컨테이너다. 서비스는 무엇이다 컨트롤러는 무엇이다. 이런 암기 방식으로 설명되어 있는데,

토비의 스프링은 반대로 초보적인 예제 소스를 먼저 보여주고, 이를 개선해 나가면서 어떤 점이 부족한지, 개선됐는지를 독자 스스로 생각하게 한다.

처음에 혼란스러운 기분으로 책과 함께 소스를 고쳐나가다보면 어느새 완성도 있고, 설계가 잘된 코드가 되어있어 놀라게 된다.

단지 스프링에 대한 책이 아니라 자바 개발자로서 추구해야하는 것이 무엇인지를 배워나가는 기분이 든다.

처음 봤을 때는 그저 두껍고 어려운 책이었는데, 한번 더 읽다보니 깨달음과 함께 부족함을 느끼게 된다.

공부할수록 공부할 게 더 많아지는 것 같다.
