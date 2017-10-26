---
layout: default
title: "RIDI"
---

<a href="../ridi/projects">책 읽기 제거</a>

<div class="catalogue">
  {% for post in paginator.posts %}
    <a href="{{ post.url | prepend: site.baseurl }}" class="catalogue-item">
      <div>
        <!--
        <time datetime="{{ post.date }}" class="catalogue-time">{{ post.date | date: "%B %d, %Y" }}</time>
        -->
        <div class="catalogue-type">{{ post.type }}</div>
        <h1 class="catalogue-title">{{ post.title }}</h1>
        <p class="body">
          {{ post.content | truncatewords: 30 | strip_html }}
        </p>
      </div>
    </a>
  {% endfor %}
</div>