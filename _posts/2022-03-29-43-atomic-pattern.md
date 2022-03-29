---
layout: post
title: 'Atomic Design Pattern'
author: 'Nostrss'
comments: true
tags: react javascript nextjs
excerpt_separator:
sticky:
hidden:
---

[참고글1: atomic design ](https://bradfrost.com/blog/post/atomic-web-design/)

[참고글2: Atomic Design and ReactJS](https://danilowoz.com/blog/atomic-design-with-react)

`아토믹(atomic)` 패턴은 단어에서도 느껴지듯이 `컴포넌트`들을 작은 단위로 만들되 `재사용성`이 크고 단단하게 잘 설계하는 것을 말한다.

웹 프론트 개발에 가장 많이 쓰이는 프레임워크인 `Vue`, `React` 모두 컴포넌트 단위로 개발을 진행하기 때문에 이러한 컴포넌트 중심 설계 패턴이 더욱 주목 받게 되었다.(최근에 나온 Flutter 또한 마찬가지이다!)

그리고 아래와 같이 구분하여 개발하는데 각 부분에서 어떤 역할에 중점을 둬야하는지 보면 아래와 같다.

![image with caption](../assets/image/Screenshot-2019-10-25-at-2.33.30-PM.png '아토믹 패턴 폴더구조 예시')

## Atom(원자)
### Generic Abstract

`원자`는 진짜 말그대로 가장 작은 단위의 컴포넌트이다.

원자는 어떠한 context가 주어지든지 이에 해당하는 컴포넌트가 생성될 수 있어야 한다.
때문에 다양한 state를 다양하게 가지고 있어야하며 추상적이지만 최대한 포용할 수 있게 되어야 설계 되어야 한다. 

Ex) button: disabled, hover, different sizes, etc. 원자는 마진이나 위치값을 가지고 있지 않는다.

## Molecule(분자)
### LittleComplex

원자를 엮어 조금 복잡한 단위의 분자가 생성된다.

`분자`는 분자만의 프로퍼티를 가지고 있을 수 있고 이를 활용해 원자에 기능을 만들어 줄 수도 있다.
분자가 원자의 위치값을 지정하기도 한다.

## Organism(유기체)
### MoreComplex

`유기체`는 분자를 엮어 만들어서 생성되고 때로는 분자가 되지 않은 원자가 엮이기도 한다.
유기체가 완성되면 컴포넌트가 최종 모습을 가지게 된다.

하지만 여전히 contents에 따라 최대한 재사용성 높게 개발하는 것이 중요하다!
유기체는 분자와 원자의 위치값을 조정한다!

## Template(템플릿)
### Layout #NoStyling

`템플릿`은 만들어진 유기체와 컴포넌트의 positions, placements을 정해주는 역할을 한다.

단, 템플릿에는 Styling이나 Color는 들어가지 않는다.
템플릿의 역할은 페이지의 그리드를 정해주는 역할 뿐이다.

## Page(페이지)
### Final
`페이지`는 템플릿을 이용해서 각 그리드에 컴포넌트를 그려서 디스플레이한다