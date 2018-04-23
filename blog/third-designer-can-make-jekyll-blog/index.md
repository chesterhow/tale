---
layout: post
title:  "본격적으로 Jekyll Theme 커스터마이징하기"
subtitle: "디자이너도 만드는 Jekyll Blog - 3편"
type: "Development"
blog: true
text: true
author: "Jihye Leee"
post-header: true
header-img: "img/third_custom.jpg"
order: 4
---

[1편 - ‘비개발자에게 진입 장벽이 높은 Jekyll 설치하기’](www.jihyeleee.com/blog/designer-can-make-jekyll-blog/)

[2편 - ‘Jekyll Blog 생성에 필요한 기초적인 Github 사용법’](www.jihyeleee.com/blog/second-designer-can-make-jekyll-blog/)

# 1,2편과 3편의 다른 점

1편에서는 터미널에 `$ jekyll new my-awesome-site` 코드를 쳐서 완전히 새로운 블로그를 로컬에 생성했다. 2편에서는 1편에서 생성한 `my-awesome-site` 폴더를 Github 저장소에  Push 하는 과정을 다루었다. 3편은 조금 다르다. 3편에서는 새로운 블로그를 만드는 게 아닌, 이미 다른 사람이 만든 블로그를 가져와서 커스터마이징하는 과정을 다룬다.

그래서 새로운 블로그를 만들어서 사용하고 싶다면 1편을 참고하여 블로그를 생성하고 2편을 참고하여 Github에 업로드하면 된다. 이미 잘 짜여있는 다른 블로그를 커스터마이징하여 사용하고 싶다면 1편으로 Jekyll 설치 과정까지만 진행한 후, 3편을 보고 커스터마이징 작업에 착수하면 된다.

# 원하는 구조의 Jekyll Theme 찾기
먼저 [Jekyll Themes](http://jekyllthemes.org/) 사이트에서 Fork[^1]할 Theme을 찾는다. 디자인 퀄리티보다는 구현하고자 하는 구조에 초점을 맞춰 찾는 게 중요하다. 나의 경우, 심플하고 깔끔한 [Tale](https://github.com/chesterhow/tale) 이라는 Theme을 생각 없이 Fork했고 한참 커스터마이징을 진행했다. 원래 구조를 내가 원하는 방향으로 쉽게 수정할 수 있을 거로 생각한 게 잘못이었다. 그래서 조금이라도 덜 고생하려면 무조건 계획을 세우고 원하는 구조의 Theme을 찾자.

# 구조 다시 짜기
원하는 구조의 Theme을 찾았다면 이 내용은 건너뛰어도 좋다. 앞서 말했듯이 내가 선택한 Theme은 단순한 디자인의 구조여서 이를 다시 짜는 과정이 필요했다. ‘Tale’의 구조는 아래와 스케치와 같았다.

![Structure of Tale](./img/structure_tale.jpg)

메인 페이지에서 ‘Posts’, ‘About’ 두 가지 메뉴에 접근할 수 있고 About은 단일 Markdown 파일 하나가 연결되어 있다. ‘Posts’ 메뉴에는 여러 Article (Mardown)이 있다. ‘Posts’ 메뉴의 글은 Markdown 파일명에 입력한 날짜를 기준으로 정렬된다. 이런 형태는 Jekyll의 기존 구조라 볼 수 있고 이를 [Post](http://jekyllrb-ko.github.io/docs/posts/)라고 부른다. 하지만 내가 원했던 구조는 아래 이미지와 같았다.

<br />

![My structure](./img/structure_mine.jpg)

‘Work’, ‘Blog’, ‘About’ 3개의 메뉴로 구성된다. ‘About’과 ‘Blog’ 메뉴는 ‘Tale’과 거의 같아서 수정하기만 하면 되었다.
문제는 ‘Work’ 메뉴였다. 각 회사에서 작업했던 프로젝트를 글로 ‘Work’ 메뉴에 업로드하려고 했다. 과거 작업에 대한 글이라서 특정 날짜를 적기가 모호했다. 그래서 날짜가 파일명에 포함되어야 하는 Post는 쓰고 싶지 않았다. 하지만 ’Tale’은 Post를 사용하고 있어서 어떻게 수정해야 할지 막막했다.[^2]

# Jekyll 디렉터리 구조 파악하기
일부만 수정할 거라면 어떻게 디렉터리가 구성되어 있는지, 어떤 파일이 어떤 역할을 하는지 자세히 몰라도 상관 없다. 하지만 나의 경우 전반적으로 갈아엎어야 해서 Jekyll 디렉터리 구조를 알아야 했다. Jekyll의 기본 구조는 다음과 같다.

- _config.yml
	- 환경설정 정보를 담고 있다. head에 넣는 메타 정보[^3]와 비슷한 정보를 담기도 하고 baseurl, url 등도 설정할 수 있다.
- _drafts
	- 아직 게시하지 않은, 날짜 정보가 없는 Post를 보관할 수 있는 디렉터리이다.
- _includes
	- 재사용할 수 있는 부분적으로 만들어진 html 파일을 보관할 수 있는 폴더이다. 예를 들면 header나 footer는 모든 곳에서 반복적으로 사용하기 때문에 include 폴더에 만들어놓고 가져다 쓰면 편하다. liquid 태그로 `_include`  안에 html을 소환할 수 있다.
- _layouts
	- `default.html` 은  최상위 Jekyll Blog 구성을 담고 있는 파일이라고 볼 수 있다. `_include`  폴더 안에 부분적인 html 들이 소환되어 있다. `post.html` 은 Post의 형태를 정의해놓은 html 파일이다. 
- _posts
	- 날짜별로 정렬되는 형태의 아이템이 모여있는 폴더이다. 파일명은 반드시 `2018-01-28-title.md`  형태를 띠어야 한다.
- _data
	- 블로그에 사용할 수 있는 데이터를 모아놓을 수 있는 폴더이다. 확장자가 `.yml`, `.yaml`, `.json`, `.csv`  일 경우 자동으로 읽어 들여서 `site.data`  변수를 써서 불러올 수 있다.
- _site
	- Jekyll이 다른 디렉터리에 있는 모든 파일을 활용해서 Site로 자동 변환 작업을 마치면 그 파일들이 저장되는 폴더이다. `_site` 폴더 내 파일은 건드리면 안 된다.   
- index.html
	- 블로그에 접속했을 때 제일 먼저 자동으로 보여주는 파일이다.

하지만 디렉터리를 찬찬히 살펴봐도 머릿속에 들어오지도 않고 원하는 구조로 만들려면 어떻게 해야 할지 전혀 감이 오지 않았다. 할 수 없이 다시 구글링에 착수했다.

# Page로 해결하기
마침내 Stockoverflow에서 [나와 비슷한 문제를 겪고 있는 이의 질문](https://stackoverflow.com/questions/17118551/generating-a-list-of-pages-not-posts-in-a-given-category/17913214#17913214)을 찾아냈다. 그리고 가장 많은 표를 받은 답변으로 의도했던 ‘Work' 메뉴 구조를 만들 수 있었다. 각 ‘Company' 이름의 폴더를 만들고 그 안에 `index.html` 혹은 `index.md`를 만든다. 그렇게 구조를 갖추면 [Page](http://jekyllrb-ko.github.io/docs/pages/) 변수를 사용할 수 있다. 그리고 그 안에 프로젝트 이름의 폴더를 만들고 또 안에 `index.html` 혹은 `index.md` 를 만들면 계속 위계를 주어 연결할 수 있다. 사실 현재 이 글이 속해있는 ‘blog’ 메뉴도 Post가 아닌 Page를 활용해서 만들었다. 현재 내 블로그의 [폴더 구조](https://github.com/iamleejihye/iamleejihye.github.io/tree/master/blog)를 보면 참고하면 좋다.

![My structure](./img/page_structure_example.jpg)

## Collection
Page로 문제는 해결했지만, 나중에 알게 된 Collection이라는 기능이 ‘Work’ 메뉴를 구성하기에 더 적합하다는 걸 뒤늦게 알게 되었다. Collection으로 날짜별로 정렬하고 싶지 않지만 서로 어느 정도 관련이 있는 글에 사용한다. Collection에 대한 설명은 [Jekyll의 공식 문서](http://jekyllrb-ko.github.io/docs/collections/)를 참고하면 될 것 같다.

사실 Page는 관련이 없는 카테고리를 최초에 나눌 때 쓰는 게 좋다. 그래서 Page는 컨테이너 역할을 하고 해당 메뉴 안에 글은 각 성격에 맞게 Post나 Collection을 쓰는 게 좋다.

# Liquid 공부하기
구조를 만든 뒤 남은 작업은 본격적으로 커스터마이징하는 일이다. HTML, CSS는 논외로 하고 Jekyll 블로그를 만들다보면  `Liquid` 를 사용할 일이 생각보다 많다. Liquid는 첫 번째 편에서 소개한 바와 같이 [Shopify](https://www.shopify.com)에서 개발한 Ruby 기반의 Template Language이다. 처음 보는 문법이라 어려워 보일 수 있다. 하지만 뜯어서 보면 생각보다 어렵지 않다. 오히려 직관적이다.

## Output과 Tag
Liquid에는 두 가지 마크업 형태가 있다. `Output` 과 `Tag` 이다.

Output은 두 개의 중괄호로 둘러싸여 있다. 다음과 같이 사용한다.

{% raw %}`{{ skill-role.name }}`{% endraw %}

여기서 `skill-role` 은 `_data` 폴더에 `skill-role.yml` 을 뜻한다.  `name` 은 `role.yml`  안에 정의해놓은 변수고 name에는 `UI Design`, `UX Design` 등 스킬들을 속성 값으로 입력해놓았다. 이처럼 Output은 템플릿이 렌더링 되면 변수의 값으로 치환돼서 뿌려지게 된다.

![The example of Output](./img/liquid_output_example.jpg)

 `Tag` 는 하나의 중괄호와 백분율 기호로 둘러싸여 있다. 다음과 같이 사용한다.

{% raw %}`{% assign sorted = site.pages %}`{% endraw %}

Tag는 로직을 구성할 때 사용한다. 이 구문은 `sorted` 라는 변수에 `site.pages` 를 `assign` 하라는 뜻이다. 여기서 `assign` 은 변수를 정의할 수 있는 Tag이다.

이렇게 단편적으로 살펴보면 이해는 될 것이다. 하지만 막상 커스터마이징할 때는 어렵고 한 번에 버그 없이 잘 만들기는 어렵다. 그래도 그냥 해보는 게 제일 도움이 된다. 커스터마이징을 진행하면서 다음과 같은 문서를 보면 Liquid를 쓰는데 도움이 될 것이다. 먼저 [Jekyll에서 사용하는 변수](http://jekyllrb-ko.github.io/docs/variables/)들을 알아놓으면 `site.pages`  같은 변수들이 눈에 들어올 것이다. 또 [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)를 모르는 게 있을 때마다 사전처럼 사용하면 좋다.

# 마지막 편을 마치며
디지털 제품을 만드는 디자이너 입장에서 최대한 쉽게 이해하고 Jekyll 블로그를 만들 수 있게 하려고 노력했다. 아쉽지만 전반적으로 모든 내용을 꼼꼼히 다루지는 못했다. 글을 쓰고 보니 Jekyll의 세계는 생각보다 아주 깊고 넓다. Jekyll 블로그 만들기는 쉽지 않다. 어렵다. 커스터마이징이 자유로운 만큼 어렵다. 빌드 에러가 난다든지, 수정했지만 서버에 뛰어도 반영이 안된다든지 크고 작은 문제들을 만날 수 있다. 그때는 그냥 `구글링`하자. 구글링이면 못할 게 없다.

## 왜 구글링을 해야 할까?
사실 개발 공부를 취미로 시작한 지 얼마 안 되었을 때는 모르는 게 생기면 무조건 주변 개발자분들께 바로 물어보곤 했다. 가까이 `해답지`가 있으니까 그 유혹을 이기지 못하고 해답지를 들춰보았다. 하지만 어느 순간 스스로 문제를 해결해야 한다는 사실을 깨달았다. 해답지가 사라졌을 때 자생할 수 있는 능력이 내게 필요했다.

그리고 계속해서 구글링을 통해 알게 되었다. 한 번 더 생각해보고 디버깅하고 그래도 안 되면 계속 구글링을 하면 해결하지 못할 문제는 없다는 사실을!

## Jekyll은 내 제품을 만들어볼 수 있는 기회
처음에는 원하는 구조와 디자인의 블로그를 만들고 싶다는 단순한 이유에서 Jekyll을 시작했다. 하지만 단순히 디자인 커스터마이징을 넘어서 Jekyll은 손수 `내 제품` 을 만드는 과정을 경험할 좋은 기회라고 생각한다.

블로그를 기획하고 디자인하고 직접 개발까지 한다. 그 후에 글을 올려 런칭한 후에는 사용자 피드백을 받으며 소통한다. 어떻게 하면 내 글을 더 많이 읽히게 할 수 있을지 마케팅적 고민도 해본다. 최근에는 글을 기다리는 사람들을 위해 `COMING SOON`  태그를 달아서 예고하는 기능을 추가하기도 했다. 다음에는 해당 글을 기다리는 분들을 위해 메일 구독 기능도 추가할 생각이다.

![COMINGSOON tag](https://cdn.dribbble.com/users/291872/screenshots/4241649/attachments/969349/coming_soon_tag_for_post_draft.png)
[Dribbble에서 보기 → ](https://dribbble.com/shots/4241649-Coming-Soon-Tag-for-Post-Draft)

비개발자인 디자이너가 제품을 온전히 처음부터 끝까지 만들 기회는 흔치 않다. 넘어야 할 벽이 조금은 있지만, Jekyll로 블로그 만들기를 적극적으로 추천해보며 글을 마친다.

[^1]: Fork란 다른 개발자가 만든 Repository의 모든 내용을 내 Repository에 복사 붙여넣기를 하는 거라고 볼 수 있다. 다른 디자이너가 만든 Sketch, PSD 파일을 로컬에 다운받아서 수정해서 쓰는 거라고 볼 수 있다.
[^2]: 복잡한 구조를 구현하긴 했지만 이 글을 쓰고 얼마 안 돼서 단순한 구조로 수정하였다. 추후에 각 Company 마다 글이 많아진다면 다시 이 구조로 변경할 예정이다.
[^3]: 해당 페이지에 대한 정보를 메타 정보라고 한다. HTML <head> 안에 <meta> 엘리먼트로 표현한다. 메타 정보를 잘 채우면 SNS에서 URL을 공유할 때 풍부한 미리보기를 보여줄 수 있다. [w3c school의 meta 엘리먼트 설명 보기](https://www.w3schools.com/tags/tag_meta.asp)
