---
layout: post
title:  " CSS 속성 작성 순서  "
author: "Nostrss"
comments: true
tags: CSS
excerpt_separator: 
sticky: 
hidden: 
---

> 22/03/15 업데이트

### 모질라 파이어폭스 CSS 선언 순서

1. display
2. list-style
3. position
4. float
5. clear
6. width/height
7. padding/margin
8. border/background
9. color/font
10. text-decoration
11. taxt-align/vertical-align
12. white-space
13. other text
14. content


출처: https://jsunnylab.tistory.com/32 [Jsunny Lab]

<hr>

동영상 강의를 보다 보니 강의자가 아래와 같은 멘트를 한적이 있었다.

>CSS의 여러가지 속성을 순서 없이 작성하게 될 경우, 추후 유지보수 시 알아보는데 어려움이 있을 수 있습니다.


아래의 2개의 예를 보면  `margin`과 `padding`의 순서가 다르게 적혀있다.

``` css
.a {
margin: 100px;
padding: 100px;
}
```


``` css
.p {
padding: 100px; /* 순서가 다름 */
margin: 100px;  /* 순서가 다름 */
}
```

이 경우 작성자인 나도 그렇고 유지보수할 제3자도 수정할 속성이 몇번째에 있는지 찾는데 어려움이 있게 되는 것이다. 그래서 아래와 같이 일관된 순서로 작성하기를 추천하고 있다. 

```css
box-sizing: border-box
position: relative | absolute | fixed | sticky
display: flex | block | inline | inline-block | none
margin: 100px
padding: 100px
width: 100px
height: 100px
border: 1px solid #000
background: #fff
font-size: 16px
font-weight: 300(thin) | 400(normal) | 500(medium) | 700(bold) | 900 (extra bold) color: #000
text-align: center | left | right
overflow: auto | scroll | hidden
z-index: 1 
```
위의 순서는 예시이고 정답은 없다. 일관성 있게만 작성하면 될 듯하다. 아니면 같이 일하는 사람들과 맞추어서 결정하면 되지 않을까 생각한다.


