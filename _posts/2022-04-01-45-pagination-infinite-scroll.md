---
layout: post
title: '페이지처리와 무한 스크롤'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

## 페이지네이션

게시판이나 까페글 리스트를 보다 보면 하단에 아래와 같은 이미지의 UI를 쉽게 볼 수 있다.

![image with caption](../assets/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-04-01%20%EC%98%A4%ED%9B%84%203.24.22.png '아토믹 패턴 폴더구조 예시')

여러개의 리스트나 페이지들을 이렇게 페이지별로 나누어서 접근 할 수 있는 인터페이스를 `페이지 네이션`이라고 부른다.

## 무한 스크롤

우리가 자주쓰는 유튜브나 인스타그램처럼 모바일 환경에서는 스크롤을 하면 자연스럽게 다음 컨텐츠가 보여지는 경우가 많다. 특히 끝없이 페이지가 이어지는 것처럼 보이는 인터페이스가 있는데 이를 `무한스크롤(infinite scroll)`이라고 한다.

<div style="width:100%;height:0;padding-bottom:147%;position:relative;"><iframe src="https://giphy.com/embed/63I6FXZTXks2A" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/transparent-63I6FXZTXks2A">via GIPHY</a></p>

## 구현 원리

방법은 여러 방법이 있겠지만 내가 알고 있는 방법은 아래와 같다.

### 페이지네이션 대략적인 원리

> 가정


> api에서 1페이지에 10개씩 페이지 정보를 내려준다

> 한번에 10개 까지의 페이지네이션을 보여준다


- 10개의 배열을 생성한다.
- 시작 페이지 번호를 알아낸다.
- 시작 페이지를 기준으로 각 배열에 1씩 더한다.
- 10개의 배열을 map메소드로 접근하여 화면에 보여준다.
- 각 페이지 숫자를 ID로 지정한다.
- 페이지를 클릭 시 ID를 통해 몇번 페이지를 클릭했는지 불러온다
- 클릭한 페이지를 다시 api로 불러온다.


### 무한스크롤 대략적인 원리

페이지네이션을 구현해봤다면 라이브러리를 이용해서 쉽게 구현이 가능하다.

[무한 스크롤 라이브러리](https://www.npmjs.com/package/react-infinite-scroller)

- 최초 10개의 컨텐츠를 불러온다.
- 스크롤을 할 경우 기존 새로운 컨텐츠를 10개 불러온다.
- 보여줄 컨텐츠 정보에 기존 컨텐츠 10개 + 새로운 컨텐츠 10개로 추가 해준다.(스프레드 연산자를 사용해서 해결했다.)
- 계속해서 보여줄 컨텐츠에 10개씩 누적해서 더해줘서 보여준다.

말로 표현은 쉬운데, 라이브러리를 쓰지 않고 만들기에는 쉽지 않을 것 같다.







