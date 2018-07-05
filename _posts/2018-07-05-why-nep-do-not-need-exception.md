---

title: NPE는 왜 exception없이 사용할 수 있는가?
author: 박종철
category: java

---

NPE는 발생 지점 예상이 불가능한 exception이므로 throw를 사용하지 않는다.

반대로, 다른 exception은 try-catch 블록으로 감싼 후 catch안에 exception을 던지거나

메소드에 throw Exception 형식으로 미리 선언을 해야 사사용 가능하다.
