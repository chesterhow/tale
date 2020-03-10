\---

layout: post

title: "SSR 과 next.js"

author: "oowgnoj"

header-img: "img/post-bg-universe.jpg"

catalog: true

tags:

  \- 독서

  \- 리뷰

\---



### 서버사이드 렌더링의 필요성



#### 검색엔진 최적화

사이트가 많이 노출되기 위해, 검색엔진에서 해당 키워드를 입력했을 때 검색이 되어야 하는데요, CSR 렌더링의 경우에는 검색이 잘 되지 않습니다. 
검색엔진이 해당 검색 결과에 맞는 사이트를 찾을 때 잘 정돈된 HTML을 좋아하기 때문입니다. 최근 구글에서는 javascript 코드블록까지 포함해 검색결과를 보여준다고 하는데, 그 외에 특히 우리나라의 네이버같은 경우는 검색결과에 잘 노출되기 위해 각 페이지 특성에 맞는 tag를 검색엔진이 사이트를 수집할 때 HTML을 보여줘야 합니다.



**SSR**:사용자가 웹 페이지에 접속했을 때 서버가 사용자에게 랜더링될 HTML을 응답하여 브라우저가 바로 랜더링할 수 있게한다. 그 후 CSR과 동일하게 자바스크립트 파일을 다운로드 받고 실행한다.
**CSR**: 사용자가 웹 페이지에 들어왔을 때 브라우저가 자바스크립트 파일을 다운로드 받아 해석한 후 랜더링한다.






### NEXT JS

React SSR 라이브러리로 

작동원리

1. 사용자 -> 페이지 요청 -> NEXT.js 서버는 사용자에게 렌더링 될 HTML을 응답으로 보내줌(SSR)
   1. express index.js 실행
   2. (_app.js 실행) :모든 페이지가 불릴 때 필요한 것
   3. (_document.js) : html 같은 것
2. 추가적인 **자바스크립트 번들** 다운로드
3. 다른 페이지로 이동할 땐 SSR 아닌 브라우저에서 처리
   
   

That's exactly what we do with [Next.js](https://github.com/zeit/next.js). Instead of PHP, we build the app with JavaScript and React. Here are some other cool features Next.js brings to the table:

- An intuitive page-based routing system (with support for dynamic routes)
  - /pages 별 routing
- Automatically statically optimizes page(s) when possible
- Server-side renders page(s) with blocking data requirements
- Automatic code splitting for faster page loads
- Client-side routing with optimized page prefetching
- Built-in CSS support, and support for any CSS-in-JS library
- Webpack-based dev environment which supports [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR)
- API routes to build your API with serverless functions, with the same simple router used for pages
- Customizable with community plugins and with your own Babel and Webpack configurations

Sounds great, right? Let's give it a try.





next.js 는 pre-rendering 이라는 작업을 default로 수행합니다. (built-in)되어 있습니다. 

pre-rendering 이라는 작업은 , static generation, ssr 두가지 형태로 진행됩니다.



/pages/**?**

?안에 .js, ts, jsx, tsx 등의 파일을 만들면 next.js 는 자동으로 인식하고 routing 이 된 상태로 render 하게 됩니다.



routing 의 경우에는 기존 react-route-dom 이 아닌 next js 의 link 를 사용합니다. 사소하게 다른점이 있으니 유의해서 사용하시면 좋을 것 같습니다.

기본구조

```javascript
pages/ // HTML Document, Application Container, 각종 페이지 등을 작성한다.
    _document.js // HTML Document.
    _app.js // Application Container. 공통의 레이아웃을 작성한다.
    _error.js // Error Page.
    index.js // Root Page /로 시작되는 경로를 말한다.
    hello.js // Hello Page /hello로 시작되는 경로를 말한다.
static/ // 정적 파일 (이미지, 파일 등)을 업로드 한다.
next.config.js // Next.js의 환경 설정 파일이다. 라우팅 설정, typescript, less 등의 webpack 플러그인을 설정한다.
```

next.js 를 사용하는 이유

1. SEO

   

리액트로 이루어진 서비스 소개 어플리케이션 프로젝트에서, SSR -> 서버사이드 렌더링을 하기 위해 도입했습니다. 기존에는 프로젝트는 react, styled-component 로 만든 회사 서비스 소개페이지였는데요,  static page 를 s3를 통해 배포했습니다.



배포옵션

1. zeit.com 에서 
2. next.js 





### SPA 와 SSR의 차이점

#### SSR과 CSR 개념 정리





개발순서

`yarn install next`

/src/pages 에 index.html 생성



_document 생성 : like index.html

기존 react project 의 index.html 에 있던 header tags 들 가져옴



기존에 styled component 를 사용하고 있었다면, 
설정도 같이 해줘야함 (https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c)

_document.js





.babelrc 

````
{
  "plugins": [
    ["styled-components", { "ssr": true, "displayName": true, "preprocess": false }]
  ],
  "presets": ["next/babel"]
}
````



추가 : styled component





등을 해준 다음에, 실행을 시키니 webpack -loader -configuration을 해줘야 한다고 한다.

```
You may need an appropriate loader to handle this file type,
```

Web pack 이란, 다수의 자바스크립트 파일을 하나의 파일로 번들링하는 것이다.



next-image, next-css 라이브러리 발견

  500  yarn add @zeit/next-css
  501  yarn add next-images



해결된 듯 보인다



그 다음 발견된 문제는, 

기존의 app.js 파일을 그대로 실행했을 때, swich 가 before 하지말라고 했는데, 안되겠다 처음부터 다시 해야겠다.





### APP

#### App

<fragment> 를 써서 menupanel routing 관련 switch, 조건문을 return 하는 APP 함수

**routing** 이 이루어지는 부분이다 가능하고, 

#### Home

실질적인 본문이 나오는 부분, 

<StyledApp> 이 최상단 node 이다 , (styled.main``)

그 외의 Section Wrapper로 감싸져있는 각각의 secition 들이 정의되어 있다. section 의 순서는.

##### WelcomeSection

##### NAV

##### CafeSection

##### CafeDetail

##### ProSection

##### ProDetail

##### CounselorSection

##### CounselorDetailSection

##### CenterSection

##### EAPSection

##### AtommerceSection

##### FooterSection

으로 이루어져 있고 몇몇 component는 두 컴포넌트가 하나의 wrapper 에 감싸져 있는 경우가 있다.



#### Terms

#### PRivate

으로 컴포넌트 구성은 마무리 된다.



그러면 내가 신경써야 할 부분은, routing 하는 부분이다. 



1. CSS
2. Routing
3. Image Importing



terms 에서 import 해올 때, footer 안에 react-router-dom code 가 있었던 듯 함

그래서 잘 안된 것 같은데,