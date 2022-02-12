---
title: Diamond Mohanty
layout: default
---
<h2 class='highlight'>Projects</h2>
<ul class='list list-unstyled'>
  {% for post in site.projects limit:5 %}
    <li class='post-entry'>
      <h2 class='post-title'><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

<h2 class='highlight'>Latest Posts</h2>
<ul class='list list-unstyled'>
  {% for post in site.posts limit:5 %}
    <li class='post-entry'>
      <h2 class='post-title'><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

