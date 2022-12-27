---
title: Diamond Mohanty
layout: default
---

<ul class='list list-unstyled'>
  {% for post in site.posts limit:5 %}
    <li class='post-entry'>
      <b class='post-title'><a href="{{ post.url }}">{{ post.title }}</a></b> {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

