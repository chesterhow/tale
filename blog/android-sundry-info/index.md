---
layout: post
title:  "Android 디자인에 필요한 잡다한 지식"
subtitle: "우리나라에서 사용률이 제일 높은 Android와 친해지기"
type: "UI Design"
blog: true
text: true
author: "Jihye Leee"
post-header: true
header-img: "img/android-device.jpg"
order: 2
---

iOS 기기를 쓰는 UI 디자이너들이 많다. iPhone, iPad 등 주로 iOS 기기를 평소에 사용한다. 그렇다보니 Android 자체가 익숙하지 않을 때가 종종 있다. 하지만 국내 스마트폰 OS 점유율은 Android가 70% 이상이다.[^1] 전년도에 비해 줄어들은 수치임에도 불구하고 국내 사용자의 대부분은 Android를 사용한다. Android 기기도 몇개 가지고 있지만 주력으로 쓰지 않기 때문에 Android 지식에 뒤쳐질 때가 종종 있고 낯설게 느껴질 때가 있다.
그 중에서도 Android 버전은 iOS 버전보다는 상당히 낯설다. 알파벳 순서대로 디저트 이름을 버전명으로 사용하는 정도만 아는 분들도 있으리라 생각된다. [^2]

[^1]: 2017년 4월 Kisa 자료를 바탕으로 적은 수치.
[^2]: 왜 디저트 이름을 사용하는지 확실히 알려져있지는 않다.

# SDK 버전을 디저트 이름과 함께 API 숫자도 함께 파악하자.
## 알면 도움이 되는 이유
* Nougat나 Marshmallow 등 Android OS별 디저트 버전명이 있지만 OS 안에서도 버전이 나뉜다. 그 나눠진 버전에 숫자를 매긴 것이 API 번호이다.
* 컴포넌트의 도입 시기 및 커버할 수 있는 API 번호를 알아야 적용할 수 있는 컴포넌트인지를 알 수 있다.
  * 예를 들어, AnimatedVectorDrawable을 써서 애니메이션을 만들고 싶다고 가정해보자. 이 클래스는 API level 21부터 추가되었다. 이때 우리 제품이 API 18부터 지원하고 있다면? 하위 버전에서는 제대로 동작하지 않을 가능성이 크다. 모든 API를 한 번에 대응하려면 해당 클래스를 사용하기는 어렵다.
  * iOS에 비해 Android는 하위 버전 사용자가 많아서 쉽게 하위 버전을 버리지 못한다.[^3]
  * Material Design 가이드를 최대한 따르고 싶지만 Lollipop 이전 버전에서는 Material의 기본 컴포넌트를 사용하기 어렵다.
    * 이 이유 때문에 Material Design 인듯 컴포넌트를 만든 적이 몇번 있다.
    * ~~Material Design은 그림의 떡~~

그렇기 때문에 디자인 하고 있는 앱에서 각 기기마다 어떤 버전부터 지원하고 있는지 기억해놓으면 좋다. 자세한 내용은 [위키백과의 안드로이드 버전 역사](https://ko.wikipedia.org/wiki/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C_%EB%B2%84%EC%A0%84_%EC%97%AD%EC%82%AC), [Android - 기록](https://www.android.com/history/) 페이지 참고.

# 개발자와 디자이너가 다른 단위를 사용하는 Android의 행간

서비스에서 작지만 놓치기 쉬운 부분은 `행간`이 아닐까 생각해본다. 글자 크기, 아이콘 width, height, 여백 등은 dp로 개발자한테 전달할 수 있고 기본으로 들어있는 수치가 있지 않은 이상 기대한 대로 나온다. 하지만 행간은 dp로 전달하기 어렵다. Android 레이아웃 XML에서 행간을 어떻게 구현하는지 살펴보면 왜 그런지 알 수 있다. 일단 Android 레이아웃은 무엇일까?

> 레이아웃은 사용자 인터페이스에 대한 시각적 구조를 정의합니다. (...)
> 레이아웃을 선언하는 데에는 다음과 같은 두 가지 방법이 있습니다.
>
> 1. UI 요소를 XML로 선언.
> 2. 런타임에 레이아웃 요소 인스턴스화. [^4]

레이아웃은 아시다시피 시각적 구조이고 레이아웃을 만드는 데 두 가지 방법이 있다. 이 중에서 첫 번째 방법, Android XML에서 행간을 구현하는 방법을 알아보려고 한다. (두 번째는 뭔지 감도 안 온다... 모른다 개발 용어…) XML을 사용하면 HTML로 웹 페이지를 디자인하듯 작성할 수 있다. 그래서 HTML를 조금이라도 다룰 줄 아는 디자이너라면 어떤 구조로 되어있는지 알 수 있을 것이다.

XML이 뭔지 대충 알았으니 이제 Android에서 행간을 줄 때 사용하는 속성들을 알아보자. 첫 번째는 `lineSpacingExtra` 이다. `Extra` 를 사용할 때는 문장 사이 간격을 몇 dp로 할지 정확한 수치를 입력해주면 된다. 하지만 여기서 문제점은 폰트마다 글자 크기 마다 한 문장의 높이가 어느정도 되는지 예상하기 어렵다는 점이다. 수치를 의도할 수는 있지만 실제로 어떻게 화면에 보일지 디자이너는 알기 어렵다. 또 고정된 수치이기 때문에 글자 크기에 따라서 한 수치를 사용하는 것은 자연스러워 보이지 않을 수 있다.

`Multiplier`는 배수로 입력해주는 것이다. 글자 크기에 따라서 알아서 늘어나기 때문에 괜찮은 수치를 찾아서 모든 TextView에 적용해주는 것도 고려해볼만하다.[^5] 하지만 Extra와 마찬가지로 폰트마다 글자 크기 마다 한 문장의 Height를 정확하게 디자이너가 알기란 어렵다. 또 TextView에는 디폴트로 여백이 들어간다.

그래서 `includeFontPadding="false"` 라는 속성이 있다. 말 그대로 폰트의 Padding을 없애주는 것이다. Android Developer에서는 이렇게 소개하고 있다.

> Leave enough room for ascenders and descenders instead of using the font ascent and descent strictly. (Normally true).

사실 한글에는 Ascender와 Descender가 없다. ~~한국에서 만든 앱이라고 한글만 쓰는 건 아니지만…~~ 어쨌든 기본적으로 들어있는 여백을 해당 속성으로 제거할 수 있다. 하지만 얼마나 여백을 제거해주는지도 디자이너가 알기 어렵다. 그래서 간단하게(?) TextView를 만들어서 테스트를 해봤다.

[^3]: 그렇다고 해서 업데이트를 잘 하는 iOS에서 하위 버전을 버리는 것도 쉬운 일은 아닐 것이다.
[^4]: [Android Developers - Layout](https://developer.android.com/guide/topics/ui/declaring-layout.html) 참고
[^5]: 기존에 개발되어 있는 상태라면 모든 TextView에 적용할 경우 여기저기 난리가 날 가능성이 크다.