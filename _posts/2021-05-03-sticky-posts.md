---
layout: post
title: "Sticky Posts"
author: "Chester"
tags: Tutorial
excerpt_separator: <!--more-->
---

Sticky, or pinned, posts are featured on the top of every page. Tale provides some flexibility when it comes to this feature.<!--more--> There is no limit on the number of sticky posts you can have. Although do note that each page will show all your sticky posts + the paginated posts. So if you have 4 sticky posts and 5 posts per page, each page can display up to 9 posts.

## Making a post "sticky"

Add `sticky: true` to the frontmatter of your blog post.

### Exclude sticky post from paginated posts

By default, sticky posts are still included in the paginated posts. To exclude a sticky post from paginated posts, add `hidden: true` to the frontmatter of that blog post.

## Example

See the ["Introducing Tale" post](https://github.com/chesterhow/tale/blob/master/_posts/2017-03-29-introducing-tale.md).
