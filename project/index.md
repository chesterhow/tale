---
layout: default
work: true
main: true
title: Selected Projects
project-header: true
header-img: "img/project_bg.jpg"
description: 진행해 온 프로젝트를 종종 글로 씁니다.
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' | reverse %}
{% for page in sorted %}
{% if page.projects == true %}

     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>