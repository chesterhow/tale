---
layout: default
title: "Blog"
main: true
project-header: true
header-img: img/about.jpg
description: 관심 분야의 글을 아주 가끔씩 올립니다.
---

<ul class="catalogue">
{% assign sorted = site.pages | sort: 'order' | reverse %}
{% for page in sorted %}
{% if page.blog == true %}
{% include post-list.html %}
{% endif %}
{% endfor %}
</ul>