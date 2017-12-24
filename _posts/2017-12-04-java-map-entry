---
layout: post
title: "JAVA: Entry Already Exists in Map"
author: "M doesn't stand for Map"
---



_Map.Entry에 대하여_

Entry는 사전적인 의미로 어떤 장소에 들어가는(coming in) 것을 말합니다. 어원이 같은 enter, entrance 등의 단어와 함께 보면 그 의미가 더욱 명확해집니다. 이를 통해 Entry는 필연적으로 공간에 종속되어 있는 개념이라는 것을 알 수 있습니다. 그렇다면 그 공간은 무엇일까요? 바로 Map입니다. Java에서는 Map 안에 보관되는 데이터의 형태를 Entry라는 이름으로 정의하고 있습니다. 그래서 Entry는 독립하지 않고 Map.Entry와 같은 형태로 Map에 포함되어 있습니다. 이는 Map이라는 인터페이스 구조에서도 그대로 드러납니다. Entry는 독립적이지 않고 Map의 사용범위 내에서만 필요한 것이기 때문에 Map 인터페이스 내부의 인터페이스로 정의되어 있습니다. 이를 Nested Interface, 또는 Inner Interface라고 합니다. 두 표현이 지칭하는 것은 같습니다.

Java에서 제공하는 자료 구조인 Collection Framework는 크게 Collection 인터페이스를 구현한 계열과 Map을 구현한 계열로 나뉩니다. Collection과 다르게 Map은 데이터를 관리하기 위해 Entry와 같은 Inner Class를 필요로 합니다. 그 이유는 Map구조가 데이터를 key-value 쌍으로 저장하기 때문입니다. Map은 편리한 검색을 위한 자료 구조로, key라는 식별자를 통해 실질적으로 얻고자 하는 데이터인 value를 찾습니다. key를 지정했을 때 value가 함께 붙어 나와야 검색이 편리할 것이므로, key와 value를 하나로 묶기 위한 포장이 필요했을 것입니다. 그것이 Entry입니다.

다음은 Map과 Map의 중첩 인터페이스인 Entry의 모습을 간단히 나타낸 것입니다. Map과 Entry에 동일하게 붙은 K, V 제네릭은 각각 key와 value의 타입을 받습니다. 
```
public interface Map<K, V> {
	//
	...
	interface Entry<K, V> {
		K getKey();
		V getValue();
		V setValue(V v);
	}
}
```

Map의 구현체로는 HashTable, HashMap, TreeMap, LinkedHashMap이 있습니다. 이 중 HashMap을 통해 Entry의 구현체를 탐구해 보겠습니다. HashMap을 선택한 이유는 개인적으로 자주 마주치는 클래스이기 때문입니다. 다음은 HashMap에 구현된 Node 클래스입니다.

```
    static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;

        Node(int hash, K key, V value, Node<K,V> next) {
            ...
        }

        public final K getKey()        { return key; }
        public final V getValue()      { return value; }
        public final String toString() { return key + "=" + value; }

        public final int hashCode() {
            ...
        }

        public final V setValue(V newValue) {
            ...
        }

        public final boolean equals(Object o) {
            ...
    }
```
이 코드를 읽고 네 가지 의문점이 생겼고, 이에 대하여 나름대로 답을 찾아 정리해 보았습니다.

>1. 왜 key는 setter가 없을까?
2. next:Node<K, V>는 왜 생겼을까?
3. Node는 왜 static class일까?
4. Node의 메소드들은 왜 final일까?



**1.**
Map.Entry<K,V>에 정의된 메소드 중 value에 대한 setter와 getter는 있지만 key는 getter뿐입니다. 이는 곧 key는 객체 생성 시점에 초기화되며 그 이후로는 바뀔 수 없음을 의미합니다. value는 바뀌는데 왜 key는 바뀔 수 없을까요? Entry가 단지 검색의 편의를 위해 key-value pair를 한 단위로 가지는 객체라면 특정 value와 쌍을 이루는 key를 수정하면 안 될 이유가 있을까요? 그 이유는 두 가지로 추측됩니다. 

첫 번째는 key가 Entry 객체의 논리적 식별자이기 때문입니다. Entry 객체의 고유한 정체성인 key가 바뀌면 Entry 인스턴스는 동일성을 유지할 수 없습니다. 아예 다른 인스턴스가 되는 것입니다. 예를 들면, 통장의 계좌 번호가 바뀌면 거래 내역과 예금주가 같더라도 다른 계좌로 인식되는 것과 유사합니다.

두 번째는 key가 value에 접근할 수 있는 물리적 식별자이기 때문입니다. HashMap은 HashTable로 데이터를 관리합니다. HashTable은 데이터를 배열(Array) 형태로 저장하는데, 그 key는 value가 저장된 배열의 index와 깊은 연관성을 가지고 있습니다. HashTable은 Node를 저장할 때 그 index를 hash function을 이용해 지정합니다. 

Hash란 임의의 데이터 입력을 받아 특정 알고리즘을 통해 식별 값(hash code)으로 변환하는 것을 말합니다. 사용 범위가 넓어 이를 통칭하는 정의가 모호하지만 HashMap에서의 사용을 예시로 들면, key로 입력된 문자를 어떠한 연산을 통해 숫자, 즉 배열의 index로 변환한다고 정리하겠습니다.

HashTable은 key 값으로 'hash function'을 거쳐 나온 index에 value를 저장합니다. 이렇게 hash를 만드는 알고리즘은 여러 종류가 있다고 하는데, 주제로부터 너무 멀리 벗어나는 것 같아 알아보지 않았습니다. 그리고 key로 value를 찾을 때는 key를 다시 hash 값으로 변환한 뒤 이를 통해 value의 index를 찾습니다. 이는 HashMap에서도 마찬가지일 것입니다. 따라서 key 값이 달라지면 당연히 hash 값도 달라질 것이고 그렇다면 value가 저장된 index도 찾을 수 없을 것입니다.

**2.** hash 값을 연산하는 알고리즘이 언제나 다른 key 값에 대해서 다른 hash 값 출력을 보장하지는 않습니다. 예를 들면 5, 15, 25, 35를 모두 모듈로(%)연산자로 계산하면 출력 값이 5로 동일한 것과 같은 이치입니다. 그렇다면 다른 key 값이 같은 hash 값을 출력하여 같은 index에 다른 value를 저장해야 하는 상황이 오면 HashMap은 이를 어떻게 해결할까요?

HashMap은 LinkedList의 Node와 같은 방식으로 Node를 저장합니다. Node에 그 다음 Node를 저장하여 hash 값이 가리키는 index에 있는 Node에 next:Node가 있을 경우 반복문을 돌며 일치하는 key를 탐색합니다. 이것이 자연스럽게 두 번째 의문, 필드 next의 존재 이유에 대한 답이 되겠습니다.

**3.** Node는 HashMap 클래스에 중첩된 static class입니다. 왜 static class로 선언되어 있을까요? 

먼저 nested class가 static인 경우와 non-static인 경우의 차이점을 생각해 보겠습니다. Inner class가 static이면 outer class의 생성보다 먼저 메모리에 잡히기 때문에 outer class의 non-static 필드와 메소드들에 접근할 수 없습니다. 이 사실로 미루어 볼 때, Node를 static으로 선언한 이유는 Node 객체가 HashMap의 필드 및 메소드에 영향을 주지 않도록 하기 위한 것이라 추측됩니다. 

**4.** Node의 메소드는 모두 final입니다. final 메소드는 차후에 이를 상속한 클래스에서 재정의할 수 없습니다. 이는 해당 메소드의 역할은 단순하게 처음 정의된 선에서 제한되어야 하며 어떠한 가공을 거쳐 복잡성을 더해서는 안 된다는 의미로 이해할 수 있습니다.

