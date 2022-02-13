---
layout: post
title: " github 저장소 이름 변경 후 다시 vscode 연결하기 "
author: "Nostrss"
comments: true
tags: git vscode
excerpt_separator:
sticky:
hidden:
---

아직 `git`이 익숙하지 않아서 `github Repository`를 잘못 연결하는 경우가 종종 있다.
그때 `vscode` 터미널에서 아래와 같이 재 설정을 해주면 된다.

```
git remote set-url origin [연결할 깃허브 URL]
git remote set-url origin https://github.com/nostrss/test //예시
```

만약 재설정을 했다면 제대로 연결이 되었는지 다시 확인을 꼭 해야한다.

```
git remote -v
```
