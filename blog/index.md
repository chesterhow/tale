---
layout: default
title: "Blog"
header: true
header-img: img/about.jpg
---

<div class="catalogue">
{% assign sorted = site.pages | sort: 'order' %}
{% for page in sorted %}
{% if page.blog == true %}
​    
     {% include post-list.html %}

{% endif %}
{% endfor %}
</div>