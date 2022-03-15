---
layout: post
title: '[React] import / export'
author: 'Nostrss'
comments: true
tags: react
excerpt_separator:
sticky:
hidden:
---

## 코드분할

서비스가 활성화 되거나 앱이 커지다 보면 그 소스의 양이 방대해지기 마련이다. 방대해진 소스의 양은 유지보수나 수정에 어려운 경우가 발생하게 된다. 이런 경우 코드를 분할하면 관리적인 측면에서 효율성을 높여줄 수 있다. 

뿐만아니라 코드 분할은 앱의 코드 양을 줄이지 않고도 사용자가 필요하지 않은 코드를 불러오지 않게 하여 앱의 로딩에 필요한 비용을 줄여줄 수 있다.

## import

`export`로 내보낸 파일, 설정, 컴포넌트를 다른 JS파일에서 가져올 떄 사용한다.

``` javascript
import 이름 from 위치
```

``` javascript
import { 이름 } from 위치
```

``` javascript
import * from 위치
```

``` javascript
import * as 이름 from 위치
```

``` javascript
import { default as 이름 } from 위치
```

``` javascript
import { useState } from 'react'; // 자주 사용하는 예시
```

## Export

변수, 함수, 클래스 앞에 `export`를 붙여 외부에서 사용할 수 있도록 내보낸다.


``` javascript
export { 객체 }
```

``` javascript
export default 객체
```

``` javascript
export const 컴포넌트 = () => { return <></> }
```

``` javascript
export default class 컴포넌트 extends React.Component {}
```

``` javascript
export const 함수명 = () => {}
```

``` javascript
export default function 함수명 () {}
```

