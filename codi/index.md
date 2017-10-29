---
layout: default
work: true
title: '코딩하는 디자이너'
info: 'Co-founder, Branding · UI Designer'
sub-info: '2014. MAR - 2015. NOV'
order: 2
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' %}
{% for page in sorted %}
{% if page.codi == true %}
​    
     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>