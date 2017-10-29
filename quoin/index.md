---
layout: default
work: true
title: 'QUOIN'
info: 'GUI Designer'
sub-info: '2014. MAR - 2015. MAR'
order: 3
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' %}
{% for page in sorted %}
{% if page.quoin == true %}
​    
     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>