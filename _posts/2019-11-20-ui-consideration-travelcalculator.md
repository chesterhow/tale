---
layout: post
title: "여행계산기 UI 고려사항"
author: "oowgnoj"
header-img: "img/post-bg-universe.jpg"
catalog: true
tags:
  - UI
  - front-end
---

Travel Calculator는 ‘7박 8일 런던으로 여행가면 얼마나 들지?’의 대답을 실시간 데이터를 바탕으로 간단하게 조회 할 수 있는 mobile first web service 입니다.

![](https://cdn-images-1.medium.com/max/2160/1*kp22YgJvVftN-EpRXfhU1A.gif)

이번 포스팅에서는 Travel Calculator의 프론트엔드를 진행하며 전체적인 UI, UX 중점 point에 대한 포스팅을 진행하겠습니다.

![UI, UX 고려사항, Travel calculator](https://cdn-images-1.medium.com/max/5228/1*XE3TnRoFTCXAP8waFDc-Pw.png)_UI, UX 고려사항, Travel calculator_

### UI Main Theme

> UI : **simple** , **sensitive** 모바일 대응 application

첫번째 중점 포인트는* Simple UI *입니다.

![검색 페이지, Travel Calculator](https://cdn-images-1.medium.com/max/2000/1*YvF8MZnt-9-bZ6Di5Gyc5g.png)_검색 페이지, Travel Calculator_

**simple** : 모바일, 태블릿 등 작은 화면 안에 여러 기능과 요소가 추가되어 있다면, 작은 버튼과 글자를 다루는 유저 경험이 부정적인 요소가 될 것이라고 생각했습니다. ‘**한 페이지 하나의 기능을 수행**하는 것으로 의견이 모아졌고, ‘검색, 로딩, 트렌드, 마이페이지’ 4개의 페이지로 구성 했습니다.

![](https://cdn-images-1.medium.com/max/2000/1*6-ojoR37JVpoq7rGwo4PLw.png)

![결과(요약) 페이지, Travel Calculator](https://cdn-images-1.medium.com/max/2000/1*rrf7FRUi_1Nm2pJg_NBlIg.png)_결과(요약) 페이지, Travel Calculator_

다음 중점은 *감성적(sensitive) *디자인 입니다.

**Sensibility : **여행을 고민하는 유저가 대다수 일거라 생각했기에 감성적 디자인을 구현하고 싶었습니다. 여행사진 + white background로 사진을 두각시키는 방법을 택했습니다.

저희가 운영하던 15개의 도시의 사진을 [unsplash](https://unsplash.com/) 에서 엄선, DB 저장, 불러오는 방법을 택했습니다. 다른 옵션으로 실시간 [unsplash API](https://unsplash.com/developers) 를 사용해 도시값 query를 사용하는 방법도 있었지만, UI와 잘 어울리는 가장 최적의 사진을 사용하고 싶어 첫번째 방법을 택했습니다.

![](https://cdn-images-1.medium.com/max/2000/1*SpDMiS4o2KTFZCqNTvXuhw.png)

![로딩 / 트렌드 페이지, Travel Calcualtor](https://cdn-images-1.medium.com/max/2744/1*MoZHilBe0MwjmCa_boni1w.png)_로딩 / 트렌드 페이지, Travel Calcualtor_

다음 글에서는 Travel Calculator 에서 고려했던 User experience에 대한 포스팅을 진행하겠습니다.
