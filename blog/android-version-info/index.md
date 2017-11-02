---
layout: post
title:  "Android 디자인에 필요한 잡다한 지식"
subtitle: "우리나라에서 사용률이 제일 높은 Android와 친해지기"
type: "UI Design"
blog: true
author: "Jihye Leee"
header: true
header-img: "img/sketch-to-code-blogheader.png"
order: 1
---

iOS 기기를 쓰는 UI 디자이너들이 많다. iPhone, iPad 등 주로 iOS 기기를 평소에 사용한다. 그렇다보니 Android 자체가 익숙하지 않을 때가 종종 있다. 하지만 국내 스마트폰 OS 점유율은 Android가 70% 이상이다.[^1] 전년도에 비해 줄어들은 수치임에도 불구하고 국내 사용자의 대부분은 Android를 사용한다. Android 기기도 몇개 가지고 있지만 주력으로 쓰지 않기 때문에 Android 지식에 뒤쳐질 때가 종종 있고 낯설게 느껴질 때가 있다.
그 중에서도 Android 버전은 iOS 버전보다는 상당히 낯설다. 알파벳 순서대로 디저트 이름을 버전명으로 사용하는 정도만 아는 분들도 있으리라 생각된다.

[^1]: 2017년 4월 Kisa 자료를 바탕으로 적은 수치.
[^2]: 왜 디저트 이름을 사용하는지 확실히 알려져있지는 않다.

# SDK 버전을 디저트 이름과 함께 API 숫자도 함께 파악하자.
## 알면 도움이 되는 이유
* Nougat나 Marshmallow 등 Android OS별 디저트 버전명이 있지만 OS 안에서도 버전이 나뉜다. 그 나눠진 버전에 숫자를 매긴 것이 API 번호이다.
* 컴포넌트의 도입 시기 및 커버할 수 있는 API 번호를 알아야 적용할 수 있는 컴포넌트인지를 알 수 있다.
  * 예를 들어, AnimatedVectorDrawable을 써서 애니메이션을 만들고 싶다고 가정해보자. 이 클래스는 API level 21부터 추가되었다. 이때 우리 제품이 API 18부터 지원하고 있다면? 하위 버전에서는 제대로 동작하지 않을 가능성이 크다. 모든 API를 한 번에 대응하려면 해당 클래스를 사용하기는 어렵다.
  * iOS에 비해 Android는 하위 버전 사용자가 많아서 쉽게 하위 버전을 버리지 못한다.[^2]
  * Material Design 가이드를 최대한 따르고 싶지만 Lollipop 이전 버전에서는 Material의 기본 컴포넌트를 사용하기 어렵다.
    * 이 이유 때문에 Material Design 인듯 컴포넌트를 만든 적이 몇번 있다.
    * ~~Material Design은 그림의 떡~~

그렇기 때문에 디자인 하고 있는 앱에서 각 기기마다 어떤 버전부터 지원하고 있는지 기억해놓으면 좋다. 자세한 내용은 [위키백과의 안드로이드 버전 역사](https://ko.wikipedia.org/wiki/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C_%EB%B2%84%EC%A0%84_%EC%97%AD%EC%82%AC), [Android - 기록](https://www.android.com/history/) 페이지 참고.

[^3]: 그렇다고 해서 업데이트를 잘 하는 iOS에서 하위 버전을 버리는 것도 쉬운 일은 아닐 것이다.



# 개발자와 디자이너가 다른 단위를 사용하는 Android의 행간

서비스에서 작지만 놓치기 쉬운 부분은 `행간`이 아닐까 생각해본다.