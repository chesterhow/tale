---   
layout: post
title: "Categories"
permalink: /categories/
---

<div id="archives">
 <ul>
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <p></p>
    
    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    
    {% for post in site.categories[category_name] %}
   <li> <article class="archive-item">
      <h5><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h5>
    </article> </li>
    {% endfor %}
      
  </div>
{% endfor %}
  </ul>
</div>
