---
layout: post
title: '[코드캠프#6] 메모'
author: 'Nostrss'
comments: true
tags: memo codecamp
excerpt_separator:
sticky:
hidden:
---

## React의 리랜더링
setState는 비동기로 작동 합니다. 
setState가 동기로 작동하게되면 변경될때마다 **바로 바로 렌더링을 하기 때문에 비효율적**이다.
따라서 **임시 저장소에 모아두었다가 코드를 끝까지 읽고 한번에 바꿔서 렌더링한다.**

## state변경사항을 바로 적용하기 위해서는?
함수를 예로 들면 함수안에서 setState를 사용하지 않고 바로 직접 수행한다.

예시)
```javascript
 const onChangeWriter = (event) => {
    setMyWriter(event.target.value)
    if (event.target.value !== "" && myTitle !== "" && myContents !== "")
    {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }
```
위에 이벤트를 받는 함수가 있다. 여기서 바로 실행 적용이 되어야 할 부분은 `event.target.value`처럼 직접 수행되도록 하면 된다.

## React가 리랜더링 하는 경우

>1. 새로운 props가 들어올 때
>2. 부모 컴포넌트가 렌더링 될 때
>3. 강제 업데이트(forceUpdate)가 실행될 때
>4. state가 변경될 때

## map / filter 실무에서 For 대신 사용한다
배열 안에 들어있는 객체에도 적용이 가능하다

```
const classmate = [
				{name: "철수"},
				{name: "영희"},
				{name: "훈이"}]

//item.name => "철수","영희","훈이"
//school 속성을 일괄적으로 추가해주도록 하겠습니다.
classmate.map((item)=>({name : item.name + "어린이", school : "떡잎유치원"}))
=> (3)[
{name : "철수어린이",school : "떡잎유치원"},
{name : "영희어린이",school : "떡잎유치원"},
{name : "훈이어린이",school : "떡잎유치원"}
]
```

배열안에 들어있는 객체에 요소를 추가해도 가능하다

## 최신 데이터를 가져온다 refetchQueries
기존에 받아왔던 기존에 받아왔던 데이터가 변경 되었을 경우 최신 데이터로 다시 fetch 해주기 위해 사용한다.

```javascript
const deleteBoard = async () => {
	try {
		const result = await deleteBoard({  //삭제 통신
			variables: {
				boardId: router.query.boardId,
			},
			refetchQueries: [  //데이터가 변경되었으니 최신데이터 다시 통신
				{
					query: FETCH_BOARDS
				},
			]
		});
	} catch (error) {
		console.log(error);
	}
};
```

## React에서 Key가 필요한 이유
key가 없는 경우에는 가상 DOM을 비교하는 과정에서 순차적으로 비교하며 변화를 감지합니다. key가 있다면, 이 값을 사용하여 어떤 것이 수정이 됐는지 빠르게 감지할 수 있습니다.

여기서 비교할 때 고유한 Key값이 없다면 모든 데이터를 비교해야 하지만, Key가 있으면 Key값만 비교하여 Key가 추가 됐는지, 삭제 됐는지만 비교하여 불필요한 비교나 렌더링을 없애줍니다.

만약 key를 지정하지 않을 경우 자동으로 index를 키로 사용합니다. 하지만 이는 좋은 방법이 아니라 경고가 뜹니다.

# index는 가급적 키로 사용하지 말자
아래의 경우를 제외하면 가급적 index는 키로 사용하지 않는게 좋다

>1. 정적인 데이터. 계산되지 않고 변경되지 않는 데이터
>2. map에 있는 모든 데이터에 id가 없을 경우
>3. 데이터가 재정렬되거나 필터링 되지 않는 경우. (계속 그 자리 그대로)

