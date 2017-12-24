---
layout: post
title: "JAVA: DIY File Data Store Using Reflection"
author: "Primitive Coder M"
---




**목차**

1.	기존 방식의 문제점과 해결 방안

2.	File Data Store 개요

3.	File Data Store 구현
3.1	Entity Analyzer
3.2	FileDbWrapper

4.	발생 이슈
4.1	Field Access Permission
4.2	사용자 정의 클래스의 계층 구조 분석
4.3	List Type의 Field 저장
4.4	문자열을 primitive type으로 변환
4.5	Interface에 정의된 method의 반환 값을 저장
5.	한계점
5.1	한정적인 Interface 분석
5.2	Entity 클래스를 상속해야만 id 식별 가능
5.3	검색 key를 정의할 때 반드시 명명 규칙을 따라야 작동
5.4	테스트 케이스가 현 프로젝트에만 한정

6.	맺음말

<br>
<br>

**서론**

데이터를 저장하는 것은 가장 기본적인 전산 업무입니다. 세상의 수많은 DBMS가 개발자 대신 그러한 업무를 수행하고 있습니다. DBMS 없이 데이터를 관리하는 일이 칼 한 자루 쥐고 무인도에 떨어진 것처럼 막막하게 느껴집니다. 하지만 선구자들은 언제나 이와 같은 맨땅에서 시작했을 것입니다. 지금부터 칼 한 자루만 들고 데이터를 저장해 보도록 하겠습니다. 칼자루에는 java.io.*; 이라고 쓰여 있습니다.
<br>
<br>

######1. 기존 방식의 문제점과 해결 방안######
프로젝트의 주제는 전자 장부입니다. 전자 장부의 내용은 입출금 통장의 지면을 생각하면 쉽게 예상할 수 있습니다. 이 입출금 내역을 전산으로 옮긴다고 생각해 보겠습니다. 

등장하는 개념들 중 개체Entity로 식별된 것들은 ‘장부(Cashbook)’, ‘거래 내역(Transaction)’입니다. 

```
public class CashBook extends Entity {
	//	
	private IdName travel;
	private IdName club;
	private Socialian leader;
	private String bankAccount; 
	private String currencyCode; 
	private double monthlyDue;
	private double budgetGoal; 
	private DatePair term; 
	private String memo; 
	private long time; 
	
	transient private List<Transaction> transactions;

(이하 생략)
}
```

‘장부’에는 하나의 계좌에서 발생하는 다수의 ‘거래 내역’들이 기록된다고 Entity들 사이의 관계를 정의하였습니다.

Cashbook이 상속하고 있는 abstract class Entity는 Entity로 식별된 클래스들이 공통적으로 가지고 있어야 하는 속성과 연산을 강제합니다. 이 프로젝트의 Entity에서는 id 값과 getId 메소드를 정의하고 있습니다. 

Cashbook과 Cashbook에 포함된 Transaction들을 등록, 조회, 수정, 삭제하는 것이 핵심 기능입니다. 애플리케이션이 종료되어도 데이터를 저장할 저장소는 FileWriter 객체를 이용해 생성한 파일로 만들고, 문자열의 형태로 내용을 저장하겠습니다. 

파일로부터 등록, 조회, 수정, 삭제를 수행할 때 공통적으로 반복되는 작업이 있습니다. 그것은 파일에 저장된 문자열과 자바 객체로 데이터가 오가는 일입니다. 참고 자료로 주어진 기존의 예제 프로젝트에서는 파일에 저장된 문자열과 특정 자바 객체를 양방향으로 변환하는 코드를 직접 작성하는 방법을 사용하고 있었습니다. StringBuilder를 이용해 객체의 속성들을 모두 가져와 한 줄의 문자열로 이어 붙여 하나의 레코드를 만듭니다.

```
	private String convertToStr(CashBook cashBook) {
		//
		StringBuilder builder = new StringBuilder();		
		builder.append(cashBook.getTravel().getId());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getTravel().getName());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getMonthlyDue());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getBudgetGoal());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getTerm().getStartDate());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getTerm().getEndDate());
		builder.append(file.getDelimiter());
		builder.append(cashBook.getMemo());
		
		
		return builder.toString();
		
	}

```

그리고 이를 StringTokenizer로 잘라 객체에 다시 값을 넣어 줍니다.

```
	private CashBook convertToCashBook(String line) {
		//
		StringTokenizer tokenizer = new StringTokenizer(line, file.getDelimiter());
		String travelId = tokenizer.nextToken();
		String travelName = tokenizer.nextToken();
		Travel travel = new Travel(travelId);
		travel.setTitle(travelName);
		double monthlyDue = Double.parseDouble(tokenizer.nextToken());
		double budgetGoal = Double.parseDouble(tokenizer.nextToken());
		String startDate = tokenizer.nextToken();
		String endDate = tokenizer.nextToken();
		DatePair term = new DatePair(startDate, endDate);
		String memo = tokenizer.nextToken();
		CashBook cashBook = new CashBook(travel, monthlyDue, budgetGoal, term);
		cashBook.setMemo(memo);
		
		return cashBook;
	}

```

이와 같은 방식은 저장해야 할 Entity가 추가될 때마다 이를 관리할 Class를 추가하고 파일 입출력을 하는 유사한 코드를 반복적으로 생산해야 하며, Entity의 속성이 변경되거나 데이터 검색 조건이 변경될 때마다 코드를 수정해야 한다는 불편함이 있습니다. 

이 문제점을 해결하고자 Java reflection을 사용해 자바 객체를 동적으로 분석하여 문자열로 변환하고 이를 검색할 수 있는 스키마 또한 동적으로 생성하는 방법을 고안해 보았습니다. 
구현하고자 하는 기능은 세 가지로 요약할 수 있습니다.

>1. 미지의 자바 객체를 파일로 저장
2. 파일에서 데이터를 꺼내 객체로 변환
3. 파일에서 특정 데이터 검색

<br>
<br>

######2. File Data Store 개요######
File Data Store는 DataStore 인터페이스를 구현한 것입니다. DataStore 인터페이스는 Cashbook의 등록, 조회, 수정, 삭제 메소드를 요구하고 있습니다.
 
해당 기능들에서 공통적으로 반복되는 행위를 다음과 같이 다섯 가지로 정리했습니다.

>1. 자바 객체를 문자열로 변환하기
2. 문자열을 파일로 저장하기
3. 파일을 불러와 문자열 읽기
4. 문자열에서 특정 값 찾기
5. 문자열을 객체로 변환하기

이 네 가지 기능은 크게 둘로 나뉩니다. 

>1. 자바 객체 <-> 문자열 변환하기
2. 파일 읽고 쓰기

이 두 가지 역할을 각각 다른 클래스에 맡기기로 합니다. 첫 번째 기능, 자바 객체와 문자열 변환을 책임지는 클래스의 이름은 Entity Analyzer이며 두 번째 기능, 파일 읽고 쓰기를 책임지는 클래스의 이름은 File Db Wrapper입니다.
<br>
<br>

######3. File Data Store 구현 ######

**3.1 Entity Analyzer**

Entity Analyzer는 Java reflection을 사용해 미지의 객체를 문자열로 변환해 주고, 문자열을 다시 객체로 복원시켜 주며, 특정 문자열을 검색해 줍니다. 이 세 가지 기능을 명세해 보겠습니다.

>1. == convertToStr(Object object): String ==
2. convertToObj(String line): Object
3. hasValue(String key, String value, String line): boolean

그럼 첫 번째, 자바 객체로 문자열로 변환하는 것부터 해 봅시다.

Java reflection이란 객체를 통해 클래스 정보를 분석해내는 방법을 말합니다. 분석하고자 하는 객체에서 getClass를 호출하면 간단히 클래스 객체를 찾을 수 있습니다. 

```
cashBook.getClass();
```

getClass 메소드는 Object를 상속하고 있는 인스턴스에서 호출 가능하며, primitive type인 경우에는 .class 문법을 통해 Class를 부를 수 있습니다.

```
boolean.class;
```

그렇다면 Class가 어떤 정보들을 제공하는지 알아보겠습니다.

== https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html ==

위 문서를 참고하면 Field, Constructor, Method, Annotation 등 Class 정의 시에 들어간 대부분의 내용을 꺼내 볼 수 있다고 합니다. 미지의 객체가 등장했을 때, 이 객체에서 Class 정보를 가져와 Field의 값들을 나열하기만 하면 저절로 한 줄의 레코드가 완성되리라는 기대가 차오릅니다. 이제 Cashbook의 배를 갈라 Field들을 꺼내 보겠습니다. 
```
import java.lang.reflect.Field; 

Field[] fields = cashbook.getClass().getDeclaredFields();
```
Field들은 해당 객체의 Class에서 getDeclaredFields를 호출하여 Field 객체의 배열로 받을 수 있습니다. Filed 배열을 받는 메소드로는 getFields도 있지만 이는 접근제어자가 public인 속성만 반환합니다. 하지만 클래스의 속성은 캡슐화를 위해 private으로 선언되기 때문에 getDeclaredFields를 사용해야 합니다.

Field 객체는 해당 Field의 자료 형, 이름, 값 등을 담고 있습니다. 그러나 Cashbook의 클래스 객체는 cashbook 객체와 다릅니다. Cashbook의 형태를 정의한 메타데이터일 뿐입니다. Cashbook클래스 객체가 장부 작성 양식이라면 cashbook 인스턴스는 양식에 맞게 내용이 채워져 제출된 장부라고 할 수 있습니다. 그렇지만 양식을 알고 있다면 실제 제출된 장부를 보지 않고도 몇 번째 줄에 어떤 내용이 있을지 추측 가능합니다. 
이를 바탕으로 다음과 같은 순서의 코드를 작성할 수 있습니다.

1.	미지의 객체가 등장하면 Class 객체를 꺼낸다.
2.	Class 객체에서 Field의 배열을 꺼낸다.
3.	Field의 이름을 나열하고 차례로 해당 Field의 ‘getter’를 호출한다.

이것이 기능하려면 해당 Entity는 저장할 모든 Field에 대하여 값에 접근할 수 있는 getter를 정의하고 있어야 합니다. 그렇다면 Field의 이름으로부터 getter를 호출하는 코드를 작성해 보겠습니다.

```

Object result = null;

// 1. method 이름 만들기
String methodStr = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
Method getMethod;

try {
// 2. method 이름으로 class 객체에서 method 객체 꺼내기
  getMethod = object.getClass().getMethod(methodStr);
// 3. method를 호출하여 반환 값 받기
  result = getMethod.invoke(object);
} (catch 이하 생략)
```

이 방법을 사용하면 Field의 type이 primitive이거나 String인 경우에는 문제없이 값들을 잘 가져올 수 있습니다. 그러나 속성이 사용자 정의 클래스라면 다시 한 번 생각해 보아야 합니다. 마치 러시아 인형 마트료시카처럼 미지의 객체를 갈랐더니 또 다시 미지의 객체가 등장했습니다. Cashbook에서는 IdName이라는 VO가 그렇습니다.

그렇다면 다시 한 번 열어 보면 됩니다. 코드에는 다음과 같은 내용이 추가 되어야 합니다.
'primitive type이거나 String type이 아니라면 한 번 더 클래스를 분석하자.'


```
// field의 type의 class의 field를 찾는 뫼비우스의 reflection
field.getType().getClass().getDeclaredFields();
```

만약 Cashbook의 속성인 IdName이 Cashbook 타입의 속성을 가진다면 아마도 무한히 반복하게 될 것이므로 이런 경우에 대한 임시방편으로 Field는 2차까지만 분석하기로 제한하겠습니다.
 
이것을 Field 배열의 길이만큼 반복하면 다음과 같은 형태로 Cashbook을 문자열로 변환할 수 있습니다.

```
[File text] cashbook.db

c2a1317c-3e5c-4a5f-b3d2-d0a95f7d4e50||null||fe3bcdeb-6890-4f8c-b189-176bc3f40617||to the Java Island!||101011010||javastory||null||ko_KR||880909-2134595||Steve||Jobs||steve@gmail.com||+82 1091156435||null||KRW||100000.0||5000000.0||2017-11-09||2017-11-29||You deserve to be happy.||1510193089100||

```


문자열로 바꾸는 것은 끝났습니다. 

>1. convertToStr(Object object): String
2. == convertToObj(String line): Object ==
3. hasValue(String key, String value, String line): boolean


이제 이 문자열에서 다시 객체로 읽어올 수 있어야 합니다. 

데이터를 저장할 파일에서는 한 줄의 문자열이 하나의 레코드입니다. 문자열은 Entity의 속성 값들을 일렬로 나열해 놓은 형태이며 속성 사이의 구분 문자를 두어 이를 기준으로 하나의 속성 값을 구분합니다. 이런 형태로 구분을 하면 몇 번째 구분 문자 다음이 특정 속성이라는 것을 식별할 수 있습니다. 

이 ‘특정 속성’은 ‘몇 번째’인지를 나타내는 순서에 고정되어 있어야 합니다. 그래야 모든 레코드들이 같은 순서로 속성 값들을 나열할 것이기 때문입니다. 처음 파일을 생성하는 시점에 해당 파일에 저장될 Entity의 속성들과 순서를 함께 기록하는 작업이 먼저 필요할 것입니다.

그 정보와 파일에 저장된 문자열의 순서를 연결하는 스키마를 만들어 봅시다.

Field를 분석하면서 추출한 속성명field name과 순서를 나타내는 인덱스index를 key/value 쌍으로 연결해 Map으로 저장하겠습니다.

{key=id, value=0},
{key=name, value=1}, {..., ...}, ....... 

이것을 만들면서 역으로 인덱스를 통해 속성명을 찾을 수 있는 List도 함께 만들었습니다. 내용이 중복되는 Collection 두 개를 만드는 것입니다. 문자열<->객체 변환 시에 속성명으로 인덱스를 찾거나 인덱스로 속성을 찾거나 양방향으로 찾는 일이 잦아서 편의를 위해 이렇게 했습니다.

속성의 타입이 사용자 정의 클래스인 경우에는
``'1차 field name:2차 field name:n차 field name'``의 규칙으로 key를 정의했습니다. cashbook의 경우 ``'club:id'``, ``'travel:name'``이런 식으로 key가 만들어집니다. 

```
[fieldIndexMap/List image]
```

이제 이러한 key map/list를 이용하여 문자열을 다시 객체로 바꿔 봅시다. 문자열 한 줄을 읽어 구분 문자 단위로 문자열을 잘라낸 뒤, 순서대로 객체에 값을 넣을 것입니다. 

```
// tokenizer에 문자열 line:String과 구분 문자 delimiter:String을 넣고 생성해 줍니다. 
tokenizer는 문자열을 읽다가 delimiter가 나타나면 잘라서 하나의 문자열 조각을 만들어 줍니다.

StringTokenizer tokenizer = new StringTokenizer(line, delimiter);

// 첫 번째 문자열 조각은 해당 객체의 id입니다.
String id = tokenizer.nextToken();
```

다음은 값을 넣을 객체를 생성하는 코드입니다.

```

// clazz:Class<?> 객체로부터 String 타입의 매개변수를 요하는 Constructor 반환
Constructor<?> constructor = clazz.getConstructor(String.class);
// 새 인스턴스 생성
cashbook = constructor.newInstance(id);
```
기본 생성자가 아니라 String 매개 변수를 요구하는 생성자를 꺼내는 이유는 File Data Store에서 abstract class Entity를 상속한 개체만을 분석하도록 했기 때문입니다. Entity 객체는 이를 상속한 모든 클래스가 id:String 값을 갖도록 강제하고 있습니다. 또한 해당 id 값은 생성 시에만 외부로부터 들어올 수 있고 생성 이후에는 값에 접근은 가능하나(getId), 수정은 불가능합니다. 이는 File Data Store가 Entity 하나의 단위로 생성됨을 의미하기도 합니다.

이제 fieldIndexList에서 차례대로 field의 이름들을 꺼내오겠습니다. field를 찾는 key 값 중에 계층 구분 문자(':')를 포함하고 있다면 바로 값을 주입할 수 없으므로 다시 한 번 객체를 생성하는 과정을 거쳐야 합니다.

field에 값을 넣는 방법에는 두 가지가 있습니다. 첫 번째는 setter 메소드를 호출하는 방법입니다. 이는 getter를 호출하는 방식과 동일합니다. 그러나 setter가 정의되어 있지 않다면 무효합니다. 

두 번째는 Field 객체를 가져와 직접 값을 넣는 방식입니다. Field 클래스는 set(Object), setBoolean, setInt, setDouble 등의 메소드를 제공합니다. 이 방법은 setter 메소드가 정의되어 있지 않은 클래스에도 적용 가능하므로 이 방안을 채택하겠습니다.

두 번째 방법을 사용하기 위해서는 Field의 타입에 따라 다른 메소드를 호출해야 합니다. 이 경우에는 switch문을 사용하는 것이 바람직해 보이지만 switch문은 int, String, Enum 타입의 변수만 허용하기 때문에 if문의 나열로 타입을 비교하는 코드를 작성했습니다. Class 객체의 isPrimitive 메소드로 primitive 타입인지를 먼저 선별한 후, 제공되는 value setter 메소드 수만큼 조건문을 나열했습니다.

```
Class<?> returnType = field.getType();
if (returnType.isPrimitive()) {
    if (returnType.equals(Double.TYPE)) {
		double returnValue = Double.valueOf(value.toString());
		field.setDouble(object, returnValue);
	}
    if (returnType.equals(Boolean.TYPE)) {
		boolean returnValue = Boolean.valueOf(value.toString());
		field.setBoolean(object, returnValue);
	}
	if (returnType.equals(Integer.TYPE)) {
		int returnValue = Integer.valueOf(value.toString());
		field.setInt(object, returnValue);
	}
...
}

```


다음은 위와 같은 작업을 통해 완성된 converToObj 메소드 정의 축약 코드입니다. line:String(파일로부터 읽은 문자열)을 clazz:Class<?> 타입의 객체로 반환하는 메소드입니다.

```
public Object convertToObj(String line, Class<?> clazz) {
	//
	StringTokenizer tokenizer = new StringTokenizer(line, delimiter);
	Object object = null;
	try {
		Constructor<?> constructor = clazz.getConstructor(String.class);
		String id = tokenizer.nextToken();
		object = constructor.newInstance(id);
		tokenizer.nextToken(); 
			
		for (int i = 1; i < fieldIndexMap.size()-1; i++) {
			Object value = tokenizer.nextToken();
			String filedName = this.fieldIndexList.get(i);
			// field depth delimiter를 포함하고 있지 않은 key와 연결된 field에는 바로 값을 대입하는 메소드를 호출합니다.
			if (!filedName.contains(":")) {
				Field field = object.getClass().getDeclaredField(filedName);
				setObjectValue(field, value, object);
			} else {
				// 그렇지 않을 경우, field object를 생성하여 값을 넣은 뒤 다시 setObjectValue를 호출하는 메소드를 호출합니다.
				if setFieldObjectValue(filedName, value, object);
			}
		}
		
	}(catch문 이하 생략)
```


세 번째로 파일에 저장된 문자열 상태에서 특정 값을 검색하는 hasValue 메소드를 구현해 보겠습니다.

>1. convertToStr(Object object): String
2. convertToObj(String line): Object
3. == hasValue(String key, String value, String line): boolean==

hasValue는 key, value, line을 매개변수로 받습니다. 그 의미는 다음과 같습니다.
`넘겨받은 line에서 key가 가리키는 문자열이 value의 값과 같으면 true, 아니면 false를 반환한다.`

메소드 내부에서 일어나는 연산은 다음과 같습니다.

1. line을 delimiter 단위로 자른다.
2. filedIndexMap에서 key가 가리키는 index를 찾는다.
3. index번째의 문자열 토큰과 value를 비교한다.

이로써 문자열 검색은 가능하게 되었지만 이러한 방식에는 두 가지 문제가 있습니다. 

1. File Data Store의 사용자가 key 값을 직접 입력해 주어야 합니다. key는 EntityAnalyzer가 생성되는 시점에 자동으로 Entity를 분석하여 생성되기 때문에 이대로 인터페이스를 노출하면 사용자가 EntityAnalyzer의 내부를 이해하고 자동 생성된 key를 예상하여 입력해야 합니다. 

2. 복합적인 검색 조건이 들어올 경우, 또는 검색 조건이 추가, 삭제될 경우에 여러 차례의 코드 수정, 추가가 필요해집니다.

이 두 가지 문제를 해결하고자 검색을 위한 searchKeyMap을 정의했습니다. searchKeyMap은 사용자가 알고 있는 search key와 실제 Entity의 field를 가리키는 field index key를 연결하는 지도입니다.

Map의 key는 search key, value는 filed index key가 됩니다. searchKeyMap의 생성에는 두 가지 방법을 두었습니다. 

1. SearchKey 객체를 만들어 EntityAnalyzer에 넘겨 주면 이를 분석하여 searchKeyMap에 값을 채우는 방법
2. 사용자에게 search key를 추가하는 메소드를 열어 주어 File Data Store 구현 시에 직접 추가할 수 있도록 하는 방법

첫 번째 방법은 다음과 같이 구현됩니다.

[CashbookSearchKey Class]
```
public class CashBookKey {
	
	private String travelName;
	private String clubName;
	...
(이하 생략)
}
```

[CashbookFileStore]

```
	public List<Object> readByCondition(Object condition) {
		// 
		List<Object> list = new ArrayList<>();
		
		BufferedReader reader;
		try {
			reader = file.requestReader();
			String line = null;
			Map<String, String> keyMap = analyzer.getValidSearchKeys(condition);
			while ((line = reader.readLine()) != null) {
				if (analyzer.hasValue(keyMap, line)) {
					Object object = analyzer.convertToObj(line, entity);
					list.add(object);
				}
			}
			reader.close();			
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (list.isEmpty()) {
			System.out.println("No " + entity.getSimpleName() +" in the storage.");
		}
		return list;
	}

```

[Entity Analyzer]
```
	public boolean hasValue(Map<String, String> validSearchKeyMap, String line) {
		//
		String value = null;
		for (String keyName : validSearchKeyMap.keySet()) {
			if ((value = validSearchKeyMap.get(keyName)) != null) {
				boolean result = hasValue(this.searchKeyMap.get(keyName), value, line);
				if (result) {
					return true;
				}				
			}
		}
		return false;
	}

```
이 방법은 searchKey의 필드 이름이 field index Key의 이름과 일치해야만 자동으로 key를 찾을 수 있다는 한계가 있습니다.

두 번째 방법은 위에 더하여 다음과 같은 메소드를 만들었습니다.

[Entity Analyzer - addSearchKey method]
```
	public void addSearchKey(String searchKeyName, String fieldName) {
		//
		this.searchKeyMap.put(searchKeyName, fieldName);
	}

```
이 방법은 search key를 등록하는 사람이 field index key를 알고 직접 입력해 주어야 하는 한계가 있습니다. SearchKey 클래스를 정의하는데 불가피하게 key의 이름이 일치하지 않을 경우 사용합니다.

<br>
<br>

**3.2 File Db Wrapper**

_Writing is going to find better way..._
