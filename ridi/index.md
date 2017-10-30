---
layout: default
work: true
title: 'RIDI'
info: 'UI Designer'
sub-info: '2015. JUN - Present'
time: 2015-04-03
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