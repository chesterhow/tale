---
layout: default
title: "Android"
work: true
description: 안드로이드 개발 공부 과정을 담은 페이지 입니다.
main: true
project-header: true
header-img: img/about.jpg
---

<div class="catalogue">
    {% assign sorted = site.pages | sort: 'order' | reverse %}
    {% for page in sorted %}
    {% if page.android == true %}
    
         {% include post-list.html %}
    
    {% endif %}
    {% endfor %}
    </div>