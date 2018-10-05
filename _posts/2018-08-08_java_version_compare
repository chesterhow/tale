---

title: 자바 버젼별 차이
author: jaycee
description: 버젼별 차이와 최신버젼을 써야하는 이유.
category: spring
tag: spring,java,reflection

---

##보안
oracle java6 의 End of Public Update 는 2013년 2월, java7은 2015년 4월에 종료되었습니다.  

무슨 말인고 하면, 누군가가 java의 새로운 보안 결함을 발견한다면 java6 / java7 로 개발된 서비스는 더이상 보안 업데이트가 없다는 뜻입니다.  

다음 사이트(<a href src="https://www.cvedetails.com/vulnerability-list/vendor_id-93/product_id-19117/Oracle-JRE.html" target="_blank">oracle jre 링크</a>)를 참고하시면, 지금까지 알려진 보안 결함 리스트를 보실 수 있는데요.  

java6 은 대략 200여 개, java7은 대략 100여 개 정도의 보안 결함 업데이트가 없었습니다.  

물론 네트워크 방화벽이라던지 정기 OS 패치 등으로 이중 삼중 보안 장치를 마련해 두고 있지만  

때때로 이러한 모든 보안 장치를 무력화할 만한 대형 결함이 발견되기도 하는데, 그럴 때 동작하는 서비스가 java6 / java7 기반이라면 대책이 없습니다.  

## 성능
큰 데이터셋(250,000K)을 처리할때 자바6보다 자바7이17% 빠르며, 자바7보다 자바8이 20% 빠르다.  

보통의 경우, 자바8은 자바7보다 1% 빠른다. 그리고 자바7은 자바 6보다 16% 빠르다.

## 메모리 관리 기능


## 새로운 문법 / 최신 개발 랭귀지 트랜드 반영
람다식 채용으로, 코드가 간편하지고 가독성이 좋아졌다. 그리고 병렬 프로그래밍이 가능한다.


## 라이브러리
보안이나 기능이 향상된 라이브러리를 사용하기 위해서 최신 자바버젼을 사용해야한다. 그렇지 않다면, 라이브러리를 선정하는데 제약이 발생한다.

## 참고자료
1. https://01010011.blog/2016/12/29/java6-java7%EC%9D%84-%EC%93%B0%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0/
2. http://www.optaplanner.org/blog/2014/03/20/HowMuchFasterIsJava8.html
