---

title: "rawType을 되도록 쓰지 말아야하는 이유"
author: jaycee
category: java
description: rawType을 되도록 쓰지 말아야하는 이유와 전환 방법.

---

## rawType이란?
직역하면 원천 유형이라는 뜻으로, 클래스의 타입을 가리지 않고 처리하기 위해 만들어졌다.

예) List, Map, ArrayList, Arrays 등..

## rawType 사용 시 문제가 되는 이유
``` java
List srcList = new ArrayList();
```
위 같이 선언 시 warning 이 뜬다. 에러내용: ArrayList is a raw type. References to generic type ArrayList<E> should be parameterized.

즉, 강제하진 않지만 수정을 권고 한다.


이 권고를 무시하고 아래와 같은 소스 사용 시 컴파일 에러가 발생한다.
``` java 
public class test {

	public static void main(String args []) throws Exception {
		
		List srcList = new ArrayList();
		
		for(int i=0;i<1000;i++) {
			srcList.add(Integer.toString(i));
		}
		
		for (String str : srcList) {
		    System.out.println(str);
		}
		
	}
	
}
```

하지만 컴파일라고 모든 것을 잡아내는 것은 아니다.

아래와 같이 srcList를 raw Type 리스트에 참조복사하고 이것을 String으로 처리하는 구문의 경우 컴파일러도 잡아내질 못한다.

컴파일은 통과하고, 런타임 시 에러가 발생하게 된다.

내가 만든 소스를 나만 이용하는 것은 상관없지만, 내가 만든 List를 다른 개발자가 받아서 사용하다 런타임 에러가 뜨면 아주 곤란할 것이다.

``` java
public class test {

	public static void main(String args []) throws Exception {
		
		List<String> srcList = new ArrayList<String>();
		List copyList = srcList;
		
		for(int i=0;i<1000;i++) {
			copyList.add(i);
		}
		
		for (String str : srcList) {
		    System.out.println(str);
		}
		
	}
	
}

```
에러 내용
```
Exception in thread "main" java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
	at test.main(test.java:15)
```

## 그런데 왜 rawType을 사용하는가?
자바 1.5 이하 버전에서는 generic이 없어서 raw type을 사용했다. 

그 이후에는 generic이 등장했지만, 과거 작성된 소스 또한 구동이 되어야하기 때문에 rawType을 사용한다.

그리고 나를 포함하여 그 소스를 복사하는 프로그래머들도 알게 모르게 사용한다.

또 오래된 솔루션에서 rawType으로 선언된 List만을 안정적으로 처리하게끔 만들어진 경우가 있다.


## 그렇다면 어떻게 해야할까?
선언 시 generic Type을 이용하여 인자로 들어가는 자료 유형을 강제로 제한한다.

### 잘못된 경우(raw Type)
``` java
List srcList = new ArrayList();
```
혹은 불가피하게 raw Type을 써야한다면, 오류가 없는 것/발생할 가능성이 없다는 것을 충분히 검증 후 @SuppressWarnings({ "rawtypes"}) 어노테이션을 붙여준다. (하지만 계속 유지보수하다보면 스파게티 소스가 될 가능성이 있다.)

### 잘처리한 경우(generic Type)
``` java
List srcList<String> = new ArrayList<String>();
```
