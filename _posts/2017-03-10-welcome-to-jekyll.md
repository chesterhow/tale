---
layout: post
title: "Ubuntu 비밀번호 리셋"
author: "Sangbeom"
categories:
  - 서버
tags:
  - server
  - ubuntu
---

## Ubuntu 비밀번호가 생각나지 않을때

현재 virtual box에 우분투를 설치하고 여러가지 테스트를 해보고 있는데, 로그아웃을 했다가 다시 들어가려고 하니 패스워드가 기억나지 않았다...
나는 비밀번호를 아주 간단하게 설정 했던게 분명한데...

혹시나 이런일이 또 발생하는 것에 대비해 문서로 정리하고자 한다. 좀더 [자세한 설명은 여기](https://askubuntu.com/questions/24006/how-do-i-reset-a-lost-administrative-password)에서


### GRUB 진입

GRUB에 진입하기 위해 BIOS화면에서 shift 혹은 esc를 누른다. 진입을 못했다면 심호흡을 하고 다시한번 하면 된다.

### Recovery mode로 리부팅

GRUB에 진입하면 리커버리 모드가 보인다. 목록해서 리커버리 모드를 선택하고 리부팅한다.

### 마운트 읽기/쓰기 모드

리커버리 모드에서는 기본으로 읽기 모드밖에 지원하지 않는다.
이것을 읽기/쓰기 모드로 변경한다.

```
mount -o remount,rw /
```

### 패스워드 리셋

```
root@ubuntu:~# passwd yourusername
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
root@ubuntu:~#
```

### 재부팅하여 정상모드로 진입

짜잔. 입력한 패스워드로 로그인이 될것이다.

