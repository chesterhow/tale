---
layout: default
work: true
main: true
title: My projects at work
project-header: true
header-img: "img/project_bg.png"
description: 진행했던 프로젝트를 조금씩 글로 써서 올립니다.
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' | reverse %}
{% for page in sorted %}
{% if page.projects == true %}

     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>