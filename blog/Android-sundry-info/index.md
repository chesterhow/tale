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

대부분 iOS 기기를 쓰는 UI 디자이너들이 많습니다. 저 또한 스마트폰으로 iPhone을 쓰고 있습니다. 그렇다보니 Android 디자인 시 버전이 iOS 버전보다는 낯설게 느껴질 때가 많습니다. 알파벳 순에 따라 디저트 이름[^1]으로 버전이 나오는구나 정도 아시는 분들도 많으리라 생각합니다.

[^1]: 왜 디저트 이름을 사용하는지 확실히 알려져있지는 않습니다.

# SDK 버전을 디저트 이름과 API 숫자도 함께 알고 있자.

- API 9: Android 2.3 (Gingerbread) 
- API 10: Android 2.3.3 (Gingerbread)
- API 11: Android 3.0 (Honeycomb)
- API 12: Android 3.1 (Honeycomb)
- API 13: Android 3.2 (Honeycomb)
- API 14: Android 4.0 (IceCreamSandwich)
- API 15: Android 4.0.3 (IceCreamSandwich)
- API 16: Android 4.1 (Jelly Bean)
- API 17: Android 4.2 (Jelly Bean)
- API 18: Android 4.3 (Jelly Bean)
- API 19: Android 4.4 (Jelly KitKat)
- API 21: Android 5.0 (Lollipop)
- API 22: Android 5.1 (Lollipop)
- API 23: Android 6.0 (Marshmallow)
- API 24: Android 7.0 (Nougat)
- API 25: Android 7.1 (Nougat)
- API 26: Android 8.0 (Oreo)

(2017. 10. 27. 기준)

## 알아야 하는 이유

- Nougat나 Marshmallow 등 Android OS별 버전명이 있지만 OS 안에서도 버전이 나뉜다. 그 버전이 나눠진 것까지 숫자가 매겨진에 API 번호이다.
- 컴포넌트의 도입 시기 및 커버할 수 있는 API 번호를 알아야지 적용할 수 있는 컴포넌트인지를 알 수 있다.
  - AnimatedVectorDrawable을 써서 애니메이션을 만들고 싶다. 이 클래스는 API level 21부터 추가되었다. 우리 제품이 API 18부터 지원하고 있다면? 하위 버전에서는 제대로 동작하지 않을 가능성이 크다.
  - iOS에 비해 Android는 하위 버전 사용자가 많아서 쉽게 하위 버전을 버리지 못한다. (그렇다고 iOS 하위 버전을 버리는 것도 쉬운 일은 아니지만)
  - Material Design 가이드를 최대한 따르고 싶지만 Lollipop 이전 버전에서는 Material의 기본 컴포넌트를 사용하기 어렵다.
    - 그렇게 Material Design 인듯 컴포넌트를 만든 적이 몇번있다.

그렇기 때문에 디자인 하고 있는 앱에서 각 기기마다 어떤 버전부터 지원하고 있는지 기억해놓자. 자세한 내용은 [위키백과의 안드로이드 버전 역사](https://ko.wikipedia.org/wiki/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C_%EB%B2%84%EC%A0%84_%EC%97%AD%EC%82%AC), [Android - 기록](https://www.android.com/history/) 페이지 참고.