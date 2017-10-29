---
layout: default
work: true
title: 'RIDI'
info: 'UI Designer in RIDIBOOKS Viewer Team'
date: '2015. JUN - Present'
---

<div class="catalogue">
{% for page in site.pages %}
{% if page.ridi == true %}
<a href="{{ page.url | prepend: site.baseurl }}" class="catalogue-item">
    <div>
        <!--
        <time datetime="{{ post.date }}" class="catalogue-time">{{ post.date | date: "%B %d, %Y" }}</time>
        -->
        <div class="catalogue-type">{{ page.type }}</div>
        <h1 class="catalogue-title">{{ page.title }}</h1>
        <p class="body">
          {{ page.content | truncatewords: 30 | strip_html }}
        </p>
    </div>
</a>
{% endif %}
{% endfor %}
</div>