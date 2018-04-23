---
layout: post
title:  "Jekyll Blog 생성에 필요한 기초적인 Github 사용법"
subtitle: "디자이너도 만드는 Jekyll Blog - 2편"
type: "Development"
blog: true
text: true
author: "Jihye Leee"
post-header: true
header-img: "img/github.jpg"
order: 3
---

[1편 - ‘비 개발자에게 진입 장벽이 높은 Jekyll 설치하기’](www.jihyeleee.com/blog/designer-can-make-jekyll-blog/)

# 1편에서 만든 Jekyll Blog 파일들 Github 저장소에 올리기

두 번째 편에서는 예고한 대로 Github 저장소를 만들고 이 저장소에 1편에서 만든 Jekyll 블로그가 들어있는 폴더를 Sourcetree로 올려볼 것이다. 그리고 Github Pages로 Jekyll 블로그를 호스팅하여 http://username.github.io/ 로 접속하기까지 진행해볼 예정이다.

# Github과 Git의 차이점

Github 저장소(Repository)를 만들기 전에 Github과 Git의 차이점을 알아보자. Github이란 `Git을 사용하는 프로젝트를 위한 저장소`이다. 그렇다면 Git은 무엇일까? Git은 `분산형 버전 관리 프로그램`이다. 말 그대로 코드를 분산하여 버전 관리를 하는 것이다. 버전 관리 시스템은 파일의 수정 사항을 모두 기록한다. 그래서 문제가 생겼을 때 특정 시점으로 되돌릴 수 있고 누가 언제 수정했는지도 알 수 있다.[^1]
Git과 같은 버전 관리 시스템은 코드의 유지보수를 위해 만들어졌지만 코드에만 적합한 시스템은 아니다.[^2] 이제 Github 저장소를 만들어보자.

# Github 저장소 만들기

1. 우선 [Github](http://gihutb.com)에 가입한다. Github Pages로 호스팅하면 Username이 URL에 사용된다. Username은 바꿀 수 있지만 그래도 URL에 사용될 것을 고려해서 정하자. 
2. 로그인 후 초록색 ‘New Repository’라고 적힌 버튼을 누른다.
3. Repository 이름은 `username.github.io`로 적어야한다.  그래야 Github Pages로 호스팅할 수 있다. 나중에 수정할 수 있다.
4. README는 만드려는 저장소의 사용법, Copyright 등을 적는 Markdown 파일이다.

# Sourcetree로 로컬에 생성된 Jekyll 블로그 폴더, Github 저장소에 올리기
## Sourcetree 설치 및 Github 저장소 연결하기
Github 저장소를 만들었다면 Sourcetree로 로컬과 만든 Github 저장소를 연결해보자. Sourcetree란? 앞서 설명한 Git을 GUI로 쓸 수 있는 툴이다.[^3] Sourcetree 외에도 [Github Desktop](https://desktop.github.com), [GitKraken](https://www.gitkraken.com) 같은 다른 GUI 툴도 있다. 이 글에서는 Sourcetree를 기준으로 설명한다. GUI 툴을 사용하면 Git에서 사용하는 명령들을 더 편리하게 쓸 수 있다. Git에서 쓰는 명령들은 설치 후 설명할 것이다.

1. [Sourcetree](https://www.sourcetreeapp.com/) 사이트에 가서 Sourcetree를 다운로드한다.
2. Sourcetree는 Atlassian 계정이 필요하다. [Atlassian](https://id.atlassian.com/signup?application=mac&continue=https://my.atlassian.com) 사이트에서 계정을 만든다.
3. 다운받은 Sourcetree를 설치한다. 설치하는 과정에서 가입한 Atlassian 계정과 연동할 Github 계정에 로그인해야 한다. 위에서 만든 Github 계정에 로그인하자.
4. 설치가 완료되면 저장소를 관리하는 조그마한 빈 창이 뜬다. 이 빈 창은 저장소 브라우저(Repository Browser)라고 한다. 거기에서 ‘새로 만들기(New)…’를 누르고 ‘URL에서 복제 (Clone from URL)’를 누른다.
5. ‘저장소 복제 (Clone a repository)’ 창이 뜨고 ’Source URL’ 입력 필드에 http://github.com/`Github 계정 이름` / `저장소 이름.git` 을 입력한다.
  - 예를 들면 내 계정은 iamleejihye 이고 저장소 이름은 iamleejihye.github.io 여서 `https://github.com/iamleejihye/iamleejihye.github.io.git` 를 입력한다.
  - 저장소는 Github 저장소 만들기에서 설명했듯이 `username.github.io` 이여야 Github Pages를 쓸 수 있다. 
6. 입력한 후 다음 입력 필드로 넘어가면 목적지 경로 (Destination Path)와 이름 (Name)이 자동으로 채워질 것이다.
7. ‘클론 (Clone)’ 버튼을 누른다.
  - 클론 후 목적지 경로로 가면 ‘이름’으로 만들어진 폴더가 있다. 해당 폴더가 Github 저장소와 연결되어 있는 폴더라고 보면 된다.
8. 프로그레스 바가 나타나고 1분 내외가 지나면 저장소의 히스토리를 볼 수 있는 메인 창이 뜬다. 메인 창이 뜬다면 Sourcetree로 로컬과 내 Github 저장소 연결에 성공한 것이다.
9. 클론할 때 적혀있던 목적지 경로로 가서 Github 저장소 폴더에 1편에서 만든 Jekyll Blog 폴더 안 파일들을 넣어놓자. 해당 폴더는 경로를 임의로 바꾸지 않는다면 최상위 다음 폴더인  `macOS 계정 이름` 폴더 안에 있다.

이제 옮겨놓은 Jekyll Blog 폴더 안에 파일들을 Github 저장소에 올려보자. 그 전에 Git에서 주로 사용하는 명령들을 살펴보고 Sourcetree에서 사용해보자.

## Git에서 주로 사용하는 명령 및 기능들
- Commit
  - 수정 사항을 로컬에 저장한다. Commit을 쌓아두면 나중에 히스토리를 보기에 좋다. Commit 할 때마다 ~~귀찮을 수 있지만~~ 어떤 부분이 수정되었는지 자세히 적으면 좋다. Jekyll Blog는 보통 혼자 히스토리를 쌓기 때문에 한글로 작성해도 된다. 하지만 어디서 내 저장소를 Fork해 갈지 모르기 때문에 되도록 영어로 작성하면 좋다.[^4]
- Push
  - 로컬에 저장한 수정 사항을 저장소로 보낸다. Commit과 Push는 한 번에 할 수 있다.
- Pull
  - 다른 사람이 저장소에 보낸 수정 사항을 내 로컬 파일에 적용한다.
  - 협업할 때는 Pull할 일이 많다. 하지만 개인 Jekyll 블로그를 만들 때는 거의 사용할 일이 없을 수 있다.
- Branch
  - 하나의 파일을 가지(Branch)를 치듯 나눠서 작업하는 방식을 ‘Branch를 나눠서 작업한다’ 고 한다. 예를 들어 아이콘만 다르고 나머지 요소는 같은 A, B, C UI 화면이 있다. 이때 디자인 툴에서는 A, B, C 세 개의 레이어를 추가해서 작업할 것이다. 개발에서는 A, B, C 3개의 Branch를 만들어서 아이콘만 다르게 작업할 것이다.
  - 보통 Jekyll 블로그를 운영할 때는 아직 Master Branch에 Push하기[^5]에는 부족하지만 수정 사항을 기록하고 싶은 글을 작성할 때 Branch를 나눠놓는다.
- Merge
  - Branch를 나눌 수 있다면 합치는 과정도 필요하다. 이를 Merge라고 한다. Merge하는 과정에서 충돌이 있을 수 있다. 이런 충돌을 Conflict라고 한다. 에버노트를 쓸 때 발생하는 충돌과 비슷하다. 같은 노트인데 두 곳에서 수정했을 때, 어떤 노트를 유지할지 노트 내용을 보면서 하나씩 결정하는 게 Merge라고 보면 된다. 협업을 많이 하지 않는 이상 Conflict는 거의 겪을 일이 없다.
- Stash
  - 수정 사항들을 잠시 다른 곳에 보관하는 기능이다. 다양한 용도가 있겠지만 나 같은 경우 Master가 아닌 Branch에서 작업하다가 Master에만 푸시할 내용이 생길 때 주로 사용했다.

Jekyll Blog를 만들 때 위의 항목들 중 제일 많이 사용할 명령 및 기능은 Commit, Push 정도이니 나머지는 참고만 해도 괜찮다.

## Sourcetree에서 Github 저장소에 Commit, Push하여 수정 사항 올리기
Github 저장소 폴더에 1편에서 만든 Jekyll Blog 내 파일들을 옮겨놨다면 Sourcetree 히스토리를 볼 수 있는 메인 창에 Bold체로 `Uncommitted changes` 라고 써있을 것이다. 아직 Commit 하지 않은 수정 사항이 있을 때 해당 메시지가 보인다. Github 저장소 폴더 입장에서 보면 빈 폴더였다가 새로운 파일이 추가되었기 때문에 이를 수정사항으로 간주한다. 이제 왼쪽 상단의 Commit 버튼을 누르고 Commit 메시지를 작성하자. Git에서 주로 사용하는 명령 및 기능들에서 설명한 것처럼 Commit 메시지에는 어떤 사항을 수정했는지 적으면 된다. Commit 후 Push까지 해주면 비로소 Github 저장소에 수정 사항이 올라가게 된다.

# Github Pages로 Publishing 하기
이제 Github 저장소를 Github Pages로 Publishing 해보자. Publishing 하면 `http://username.github.io` 주소로 들어갔을 때 Github 저장소에 올린 Jekyll Blog에 접근할 수 있다.
1. Github 사이트에서 username.github.io 저장소 페이지에 들어간다.
2. 상단 저장소 이름 아래에 Code, Pull Request, Projects… 등 6가지 탭이 보일 것이다. 그 중 제일 오른쪽에 있는 `Settings`에 들어간다.
3. 기본으로 선택된 Options 탭에서 하단으로 스크롤을 내리다보면 여섯 번째 항목에 Github Pages가 있다. Source에 기본으로 Master Branch가 선택되어 있을 것이다. 이 상태로 `Save` 버튼을 누른다. Master Branch를 Github Pages에 Publishing 하겠다는 의미이다.
4. Source 위에 연두색으로 표시된 다음과 같은 메시지가 보일 것이다. ‘Your site is published at http://username.github.io/.’ 그러면 Publishing 된 것이다. 해당 주소로 들어갔음에도 불구하고 아직 Jekyll Blog 기본 theme인 [Minima](https://github.com/jekyll/minima)가 보이지 않는다면 조금만 더 기다리면 된다. 생각보다 시간이 걸린다.

# 두 번째 편을 마치며
Github 저장소 관련 내용을 간단하게 설명할 수 있을 줄 알았다. 생각보다 내용이 길어졌다. 사실 이번 편은 구글링하면 많이 나오는 내용이고 Jekyll Blog 자체와는 크게 관련이 없어서 올릴지 말지 고민을 했다. 하지만 Jekyll Blog를 만드려면 알아야 하는 과정이기 때문에 기초적인 내용이지만 올려본다. Github 자체가 낯설은 디자이너들에게 조금이라도 도움이 되면 좋겠다. 두 번째 편에서 다루지 못한 `원하는 구조의 Jekyll Theme Repository를 Fork 뜨고 본격적으로 커스터마이징하기, Jekyll 에서 사용하는 Template Language Liquid 맛보기`는 세 번째 편에서 다루려고 한다.

그리고 2018년 1월부터 Jekyll Blog 스터디를 진행하기로 할 예정이다. 대상은 HTML, CSS를 조금 다룰 수 있는 디자이너 분들 여섯 분을 대상으로 한다. 해당 스터디에서 세 번째 편에서 다룰 내용을 함께 스터디할 예정이라 세 번째 편이 조금 더 풍부해지지 않을까 기대해본다. 

[^1]: 버전 관리 프로그램을 쓰면 조그마한 수정 사항 때문에 `진짜 최종.jpg` , `진짜 정말 최종.jpg`  이렇게 따로따로 저장할 필요가 없다. 한 파일의 히스토리를 모두 기록하고 있기 때문이다.
[^2]: 최근에는  [Abstract](https://www.goabstract.com/) ,  [Kactus](https://kactus.io/)  같이 디자인 파일에 적합한 버전 관리 서비스들도 출시되고 있다. 아직 버그가 좀 있지만 디자인 업계에도 체계적인 버전 관리 시스템이 적용된다면 협업에 크게 도움이 되리라고 생각한다.
[^3]: GUI 툴을 쓰지 않으면 GUI가 없는 터미널로 Git을 사용해야 한다.
[^4]: 알면서도 매번 까먹어서 한글과 영어가 뒤죽박죽이다. Sourcetree에서 Commit 메시지를 수정할 수 있지만 방법이 복잡하다.
[^5]: 나눠졌던 Branch를 합칠 때 보통 Master Branch에 합친다. Branch의 대표라고 볼 수 있다. 호스팅하여 URL에 접근할 수 있을 때 Master Branch에 Push하면 보통 실제 서버에 반영된다.

