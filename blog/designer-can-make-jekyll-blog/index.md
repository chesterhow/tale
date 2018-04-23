---
layout: post
title:  "비개발자에게 진입 장벽이 높은 Jekyll 설치하기"
subtitle: "디자이너도 만드는 Jekyll Blog - 1편"
type: "Development"
blog: true
text: true
author: "Jihye Leee"
post-header: true
header-img: "img/jekyll-pattern.jpg"
order: 2
---

# Jekyll과의 만남

이 블로그 기반의 포트폴리오 사이트는 Jekyll로 만들었다. 작년 이맘때쯤, 회사 블로그에 [글 하나](http://www.ridicorp.com/blog/2016/11/10/highlight/)를 올리게 되면서 Jekyll을 알게 되었다. 써보니 편리했다. Jekyll은 Static Page[^1]로 따로 서버를 만들지 않아도 된다. 또 [Markdown](https://gist.github.com/ihoneymon/652be052a0727ad59601)으로 글을 작성할 수 있다. [Typora](https://typora.io/) 같은 깔끔한 에디터로 글을 쓸 수 있다. 그래서 HTML로 글을 작성할 때보다 훨씬 편했다.

하지만 장점들에 비해 진입 장벽이 너무 컸다. 처음 회사에서 사용할 때는 어찌어찌  `sudo`를 써가며 주변에 물어가며 설치에 성공했다. 하지만 새로 산 맥북에서 Jekyll을 설치하려니 문제였다. [ Jekyll 공식 사이트](https://jekyllrb-ko.github.io/)에 나와 있는 빠른 시작 방법 중 `$ gem install jekyll` 이 한 문장을 터미널에 치고 문제없이 Jekyll을 설치하기란 내게는 불가능한 일처럼 느껴졌다.

## Node.js 기반인 Hexo로도 시도해보기

그래서 Node.js 기반인 [Hexo](https://hexo.io/ko/index.html)로 블로그를 만들어보기도 했다. 확실히 Jekyll보다는 진입 장벽이 낮았다. 하지만 Hexo의 Github Repository에 Star가 많았던 이유는 중국에서 만든 서비스여서였다. 그렇다 보니 중국어를 하지 못하는 내가 읽을 수 있는 테마 커스터마이징 관련 글이 많지 않았다. 포기할 수밖에 없었다. (~~기본 테마를 사용할 거라면 처음부터 시도도 하지 않았을 것이다~~)

## 다시 Jekyll로

어쩔 수 없이 다시 Jekyll로 돌아왔다. 일단 Jekyll은 Static Blog 중 파이가 제일 많다. 그래서 구글링할 수 있는 다양한 자료, 글들이 많다. (개발자에게도 구글링이 중요하다. 하지만 개발 지식이 없는 비 개발자에게 구글링은 생명수와 같다고 생각한다)

하지만 'Jekyll을 설치할 수 있어야 구글링해서 테마를 수정해보기라도 할 텐데' 라는 생각을 하는 분들이 계실 수 있다. Jekyll을 설치하는 과정은 비 개발자에게는 상당히 어렵다. 구글링을 하더라도 비 개발자를 고려한 글을 찾기 어렵다. 왜냐하면, 갖추고 있는 기반 환경 자체가 다르다. 개발자의 컴퓨터에 깔려있는 프로그램들이 비 개발자의 컴퓨터에는 깔려있지 않다. 그래서 `$ gem install jekyll`을 하기까지 과정을 찬찬히 정리해봤다. 이 글을 보고 시행착오를 줄일 수 있다면 좋겠다. 또 나조차도 매번 주먹구구식으로 Jekyll을 설치했으므로 과정을 정리해보고자 한다.

밑에서 설명할 과정 중 다른 프로그램을 설치해도 되는 경우도 있다. 개인적으로 Jekyll 블로그를 만들기에 성공(?)했던 과정이므로 상황에 맞게 가감하면 될 것 같다.

# Jekyll 설치를 위한 환경 만들기

- 아래 과정은 macOS Sierra 기준이다.

## 1. Command Line Tools 설치하기

예전에는 Xcode를 깔아야 Command Line Tools를 설치할 수 있었지만 이제는 아래 코드만 입력해도 바로 설치할 수 있다.

{% highlight js %}

$ xcode-select --install

{% endhighlight %}

위와 같은 코드를 터미널을 열어서 쳐보자. 터미널을 열자마자 `$` 표시를 빼고 입력하면 된다. 터미널은 macOS는 기본적으로 깔려있다. Finder나 Spotlight에서 검색하면 보통 나온다. Jekyll을 계속 사용할거라면 터미널 사용법을 배워두면 좋다. 개인적으로는 장고걸스의 [커맨드 라인 시작하기](https://tutorial.djangogirls.org/ko/intro_to_command_line/)로 터미널을 공부했다. 굉장히 친절하게 설명되어 있어서 금방 배울 수 있다. Directory를 왔다갔다 이동하는 방법, 내 위치를 알 수 있는 명령어만 알아도 좋다. 

위에 코드를 치면 도구를 지금 설치할 거냐는 Alert이 하나 뜬다. **설치**를 선택하면 바로 설치가 시작된다.

## 2. Home Brew 설치하기

Home Brew를 설치하는 이유는 Ruby Version Manager를 설치하기 위해서이다. Jekyll은 Ruby라는 언어로 만들어졌다. 사실 macOS에는 Ruby가 원래 깔려있다. 그래서 나도 처음에는 Ruby를 설치할 생각을 안 했다. 하지만 구글링을 해보니 Apple에 설치된 Ruby는 사용할 수가 없다고 한다. 그래서 Ruby version manager 중 [rbenv](https://github.com/rbenv/rbenv)를 설치했다. 그에 앞서 rbenv를 설치하려면 [Home Brew](https://brew.sh/index_ko.html)가 필요하다. 공식 사이트에 따르면 Home Brew는 **Apple에서 제공하지 않는 유용한 패키지 관리자를 설치**한다.

아래 코드를 터미널에 복사해서 쳐서 Home Brew를 설치하자. 가로 스크롤 해서 끝까지 복사해야 한다.

{% highlight js %}

$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

{% endhighlight %}

위에 코드를 제대로 터미널에 쳤다면 설치 과정을 설명하는 텍스트가 자동으로 쭉 표시된다. 생각보다 오래 걸리니 기다리자.

## 3. Home Brew로 Ruby Version Manager rbenv 설치하기

### 1) rbenv 설치

{% highlight js %}

$ brew install rbenv ruby-build

{% endhighlight %}

위에 코드를 터미널에 입력해보자. `brew`에게 `rbenv`를 `install` 하라는 내용의 코드이다.

### 2) rbenv init 자동 실행 코드 입력

{% highlight js %}

$ echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
$ source ~/.bash_profile

{% endhighlight %}

터미널을 작업할 때마다 괄호 안의 명령어가 자동으로 실행되게 하는 코드라고 한다.[^2]

### 3) ruby 2.4.2 설치

{% highlight js%}

$ rbenv install 2.4.2
$ rbenv global 2.4.2

{% endhighlight %}

2017년 12월 기준 최신 버전이 2.4.2라서 2.4.2를 깔았다.

## 4. 드디어 Jekyll 설치하기

{% highlight js %}

$ gem install jekyll

{% endhighlight %}

터미널에 위와 같은 코드를 쳐보자. 아마 제대로 될 것이다. 처음에는 Jekyll 공식 사이트에서 `빠른 시작 방법`이라고 적혀 있어서 순수한 마음으로 저 코드부터 터미널에 쳐봤다. 하지만 될 리가 없었다. 앞에 4단계는 거쳐야 `$ gem install jekyll`은 실행될 수 있었다.

## 5. 로컬에 Jekyll로 완전히 새 블로그 만들기

{% highlight js %}

$ jekyll new my-awesome-site

{% endhighlight %}

위 코드는 Jekyll에게 `my-awesome-site`라는 이름의 새 Blog를 만들어달라는 명령이다. 그러므로 `my-awesome-site`는 만들고자 하는 Blog 이름으로 대체하면 된다. 새로운 블로그를 만들지 않고 괜찮은 테마를 찾아서 Fork[^3]를 떠서 수정하는 방법도 있다. 커스터마이징과 관련해서는 이후 다른 글에서 설명하고자 한다. 일단 새로운 블로그를 만들어보자.

저 코드를 입력하면 최상위 로컬 폴더에 `my-awesome-site`라는 이름의 폴더가 생성된다. 이 폴더가 나의 블로그다. 이 폴더를 Github Repository에 Push하고 Github Pages로 Publishing 하면 URL로 접근할 수도 있다. 이 내용도 다음 글에서 설명해보려고 한다.

## 6. 서버 띄어서 새로운 블로그 보기

{% highlight js %}

$ cd my-awesome-site
$ jekyll serve

{% endhighlight %}

`cd my-awesome-site`는 `my-awesome-site` 폴더로 이동하라는 뜻이다. `cd`는 아마도 'Change Directory' 라는 뜻일 것이다. `jekyll serve`는 'Jekyll 서버를 띄어라(?)' 라는 뜻이다. 그러면 Generating 과정을 설명하는 텍스트가 터미널에 쭉 나타나고 `Server address: http://127.0.0.1:4000/` 서버 주소도 보인다. 해당 주소로 접근하면 새로운 블로그를 볼 수 있다. 서버를 끄려면 `Ctrl-c`를 누르면 된다. (Command가 아니고 Ctrl이다)



# 두 번째 편 예고

두 번째 편에는 다음과 같은 내용을 담고자 한다. 몇 가지 내용은 구글링하여 쉽게 찾을 수 있는 내용이다. 하지만 쭉 이어서 Jekyll Blog를 만들 수 있도록 글로 연재해보고자 한다.

- 로컬에 만든 Jekyll Blog 폴더를 Sourcetree를 사용하여 Github 저장소(Repository)에 올리기
- Github Pages로 Publishing 하기
- [Jekyll Themes](http://jekyllthemes.org/)에서 만들고자 하는 구조의 Theme 저장소를 Fork 떠서 본격적으로 커스터마이징하기
- Jekyll에서 사용하는 Liquid[^4] 맛보기

# 공지

어떻게 Jekyll로 블로그를 만들었는지 궁금하시는 분들이 많아서 첫 번째 글을 작성했다. 하지만 첫 번째 글을 보고 설치에 문제가 생긴 경우가 있었다. 그래서 메시지를 주고 받으며 최대한 알려드리고 나 또한 도움을 받아서 첫 번째 편의 내용을 수정했다. 하지만 계속 문제가 글을 따라하면서 계속 문제가 있을 수 있겠다는 생각이 들었다.

그래서 미흡하지만 스터디를 진행해보려고 한다. 스터디를 통해서 1편에 최대한 수정 사항을 반영하고 쓰고 있는 2편을 좀 더 단단히 해볼 예정이다. 혹시 Jekyll 설치에 문제가 있거나 Jekyll Blog를 제대로 커스터마이징해서 계속 Blog를 운영해보고 싶은 디자이너가 있다면 아래 링크를 통해 신청해주시길 바란다. (스터디는 어느정도 인원이 되면 마감할 예정이다.)

[UI, UX 디자이너도 만드는 Jekyll Blog 스터디 모집](https://goo.gl/forms/y8yFk1UQe23IdsPG3)

[^1]: 한글로 정적인 페이지로 일컫는다. 서버에 저장된 형태가 그대로 유지되는 페이지이다. Dynamic Page, 동적인 페이지와 반대되는 말이다. [Wikipedia 정의](https://en.wikipedia.org/wiki/Static_web_page) 참고
[^2]: 출처: [Go Rails](https://gorails.com/setup/osx/10.11-el-capitan) 
[^3]: Fork란 다른 개발자가 만든 Repository의 모든 내용을 내 Repository에 복사 붙여넣기를 하는 거라고 볼 수 있다. 다른 디자이너가 만든 Sketch, PSD 파일을 로컬에 다운받아서 수정해서 쓰는 거라고 볼 수 있다.
[^4]: Liquid란 [Shopify](https://www.shopify.com/)에서 개발한 Ruby 기반의 Template Language이다.

