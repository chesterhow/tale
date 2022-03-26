---
layout: post
title: '[React] prop과 state'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## prop

`props` 는 컴포넌트에서 사용 할 데이터 중 변동되지 않는 데이터를 다룰 때 사용된다. 

주로 `parent` 컴포넌트에서 `child` 컴포넌트로 데이터를 전할 때, `props` 가 사용된다. 

특히 얼마전 배웠던 `container-presenter` 구조로 디자인 된 `react` 코드라면 빈번하게 사용이 된다.

```javascript
import ItemListUI from './itemlist.presenter'
import { useQuery, useMutation } from '@apollo/client'
import { FETCH_PRODUCTS, DELETE_PRODUCT} from './itemlist.query'

export default function ItemListContainer() {
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const { data } = useQuery(FETCH_PRODUCTS)

  const onClickDelete = (event) => {
    deleteProduct({
            variables: { productId: String(event.target.id) },
            refetchQueries: [{ query: FETCH_PRODUCTS }]
        })
    }
  return (
    <ItemListUI //props로 데이터 전달하기
    data={data}
    onClickDelete={onClickDelete}
    />

  )
}
```
위의 코드에서 보면 return으로 데이터를 자식 컴포넌트에 `props`로 데이터를 넘겨주고 있다.

그리고 아래의 코드에서는 매개변수처럼 `props`로 데이터를 받고 있는 것을 볼 수 있다.

```javascript
import * as M from './itemlist.style'

export default function ItemListUI(props) { //props로 데이터 받기
  return (
    <div>
    {props.data?.fetchProducts.map((el) => (
      <M.Row key={el._id}>
        <M.Column><input type="checkbox" /></M.Column>
            <M.Column> {el._id}</M.Column>
            <M.Column> {el.seller}</M.Column>
        <M.Column> {el.name} </M.Column>
        <M.Column> {el.detail} </M.Column>
        <M.Column> {el.price} </M.Column>
        <M.Column> {el.name} </M.Column>
        <M.Column> {el.createdAt} </M.Column>
        <button id={el._id} onClick={props.onClickDelete}>삭제</button>
        </M.Row>
      ))}
      </div>
  )
}
```

## State

컴포넌트에서 `유동적인 데이터`를 다룰 때, `state` 를 사용하게 된다.
아래의 예시를 보면 `useState`를 통해 `state`에 접근하는 모습을 볼 수 있다.

```javascript
import { useState } from 'react';

export default function CounterStatePage() {
  const [count, setCount] = useState(0);

  function counter() {
    setCount(count + 1);
  }
  return (

    <div>
      <div>{count}</div>
      <button onClick={counter}> 카운트 올리기!!</button>
    </div>
  );
}
```



