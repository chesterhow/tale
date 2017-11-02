---
layout: default
work: true
title: 'RIDI'
info: 'UI Designer'
sub-info: '2015. JUN - Present'
project-header: true
header-img: "img/about.jpg"
description: 1등 전자책 서점
order: 1
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' %}
{% for page in sorted %}
{% if page.ridi == true %}

     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>