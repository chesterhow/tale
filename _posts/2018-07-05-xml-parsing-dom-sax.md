---

title : XML 파싱 시 DOM방식과 SAX방식 비교
category : java
tag : java
description: dom과 sax 방식 비교 및 적합한 사용 방법.

---

## dom방식

1. xml 문서 전체를 메모리에 로드
2. 노드 들을 빠르게 검색 하고 데이터의 수정과 구조 변경이 빠름
3. 소스코드 비교적 직관적

## sax방식
1. xml 문서를 순차적으로 읽어 내려가며 노드가 열리고 닫히는 부분에서 이벤트가 발생
2. xml 문서 전체를 메모리에 올리지 않기 때문에 메모리 사용량이 적고 단순히 읽기만 할때 빠름
3. 검색 및 수정이 번거롭고 느림
4. 소스코드 복잡

출처:
http://stg.etribe.co.kr/2014/08/09/xml-%ED%8C%8C%EC%8B%B1%EC%8B%9C-dom%EA%B3%BC-sax%EC%9D%98-%EC%B0%A8%EC%9D%B4/
