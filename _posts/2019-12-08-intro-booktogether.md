---
layout: post
title: "書로모임 프로젝트 소개"
author: "oowgnoj"
catalog: true
tags:
  - web
  - front-end
---

“서로모임에 오신 분들께 당신만의 서평과 북 큐레이션을 공유하여 주세요”

서로모임은 서평과 큐레이션을 작성하고 다른 유저들과 공유할 수 있는 웹 서비스입니다. 책이 중심이 되던 대부분의 책 관련 서비스들과는 달리 ‘**책에 대한 나의 생각과 느낌**’ 에 집중하고자 하였습니다.

저는 이 프로젝트에서 프론트엔드 개발을 담당해 나의서재, 나의서평 / 큐레이션, 좋아요 페이지를 구현했습니다.

![booktogether.org](https://cdn-images-1.medium.com/max/5472/1*iTsOACnKarJYbcpWnJeq-g.png)_booktogether.org_

### 서비스 소개 , 주요기능

1. 검색

![](https://cdn-images-1.medium.com/max/2000/1*_mbzdaDToOCSA7eSNtwCmw.gif)

책 / 서평 검색을 통해 책 상세 정보, 해당 책에 대한 서평을 확인할 수 있습니다. 주요 출판사 20 여곳의 도서 정보를 보유하고 있으며 제목, 저자 순으로 가중치를 둔 검색 결과를 제공합니다.

2. 서평

![](https://cdn-images-1.medium.com/max/2880/1*RIi2YK1hsGesXdx7MJVPTg.gif)

책을 선택한 후 해당 책에 대한 서평을 작성할 수 있습니다. 책에 대한 평점을 부여할 수 있습니다.

3. 큐레이션

![](https://cdn-images-1.medium.com/max/2880/1*jZXqbGLfJtKixd4TRMA1Gg.gif)

책과 서평으로 이루어진 큐레이션을 유저가 직접 등록할 수 있습니다.

4. 나의 서재

![](https://cdn-images-1.medium.com/max/2880/1*zklWvxoX7aHB2d7k8JxvZA.gif)

읽고 싶은 책, 현재 읽고 있는 책, 다 읽은 책을 등록할 수 있으며 독서 목표 및 독서 현황 통계를 확인할 수 있는 서재 기능을 제공합니다. 유저가 작성하거나 좋아요를 클릭한 서평 / 큐레이션 목록을 확인할 수 있습니다.

### 기술 스택 (front-end)

![서로모임 front-end 기술스택](https://cdn-images-1.medium.com/max/2000/1*V5ts9OEB7uEjvP4WwnTHwQ.png)_서로모임 front-end 기술스택_

![](https://cdn-images-1.medium.com/max/2180/1*zcj0QCN-4iRl0n6b3EvwQA.png)

### 기획 및 설계

> 타임라인 및 프로젝트 구체화

프로젝트 시작 단계에서 저희는 노션 문서를 통해 프로젝트를 구체화 하고 공동의 목표를 수립했습니다.

![](https://cdn-images-1.medium.com/max/4384/1*l80G-H0BwtJyAfW5zpyx9w.png)

이 과정에서 팀원간의 자유롭게 의견을 개진하며 **기능을 확정하고 우선순위를 나누어 배포 일정 별로 action plan 을 세웠습니다.**

> UI prototyping (Adobe XD)

![](https://cdn-images-1.medium.com/max/2100/1*TX96H8QklBVE9veNqWS9vw.png)

다음으로 prototype을 제작했습니다. 이 과정에서 **팀원들의 머릿속에 있는 UI를 구체화시켜 모든 페이지에 대한 이해도를 가질 수 있었습니다. 또한 프론트 팀원들이 여럿이다보니 발생할 수 있는 페이지마다 다른 UI 도 최소화 할 수 있었다고 생각합니다.**

> component 설계 (miro)

![](https://cdn-images-1.medium.com/max/3624/1*RnP36R_1FlSe6hKCrdS5Lg.png)

다음으로 Miro에서 페이지 별 component에 대한 구조와 데이터 흐름, shared component에 대한 파악을 진행했습니다.

**팀원간에 공용으로 사용될 수 있는 컴포넌트를 파악해 작업을 분산시켜, 생산성을 높일 수 있었던 과정이라고 생각합니다.**

> daily

- 애자일 스크럼 (agile scrum)

![](https://cdn-images-1.medium.com/max/5308/1*XaQqQ6kT16BtyCt50Msc2g.png)

_애자일 스크럼 규칙_

1. 배포단위별로 할 일 (To-Do) 목록을 정리했습니다.

1. 가능한 3–4시간에 마칠 수 있는 카드를 작성하는 것을 원칙으로 했습니다.

1. 매일 두차례 (stand-up meeting, code review) 시간에 카드를 다같이 확인하며 동료들의 진행상황을 파악했습니다. 또한 미처 카드를 넘기지 못한 경우에 같이 관리하며 최대한 반영하려 노력했습니다.

- stand-up meeting

![](https://cdn-images-1.medium.com/max/2888/1*ZQrcmxdx_oD2Y67vh0WBGw.png)

매일 아침 정기적인 미팅을 통해 팀원간의 진행 / 특이사항을 공유했습니다. 미팅 로그를 돌아가며 자세하게 기록하는 것을 원칙으로 했습니다. 후에 회의사항에 대한 참고가 필요할 때 도움이 많이 되었습니다.

다음 블로그 포스트에서는[ ‘프로젝트의 가장 큰 실수 : 컴포넌트 캡슐화’](https://medium.com/@oowgnoj/%EC%84%9C%EB%A1%9C%EB%AA%A8%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1-%EA%B0%9C%EB%B0%9C%ED%95%98%EB%A9%B0-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%8B%A4%EC%88%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%BA%A1%EC%8A%90%ED%99%94-59ab99a05d55) 에 대해 포스팅을 하겠습니다. 읽어주셔서 감사합니다 !
