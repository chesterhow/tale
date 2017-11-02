---
layout: default
work: true
title: 'QUOIN'
info: 'GUI Designer'
sub-info: '2014. MAR - 2015. MAR'
description: 쫀득한 경험을 만드는 UX 에이전시
project-header: true
header-img: "img/header-quoin.jpg"
order: 3
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' %}
{% for page in sorted %}
{% if page.quoin == true %}
     {% include post-list.html %}
{% endif %}
{% endfor %}
</div>