---
layout: default
work: true
main: true
title: 'RIDI'
info: 'UI Designer'
sub-info: '2015. JUN - Present'
project-header: true
header-img: "img/ridi.png"
description: MUST-USE 전자책을 만듭니다.
order: 1
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' | reverse %}
{% for page in sorted %}
{% if page.ridi == true %}

     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>