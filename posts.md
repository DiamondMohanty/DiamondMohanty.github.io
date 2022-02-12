---
title: Posts
layout: post
---
<ul class='list list-unstyled'>
  {% for post in site.posts %}
    <li class='post-entry'>
      <h2 class='post-title'><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>