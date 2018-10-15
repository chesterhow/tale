---
layout: post
title: "Ubuntu에 Elasticsearch 6.x 설치"
author: "Sangbeom"
categories:
  - 서버
tags:
  - server
  - ubuntu
  - elasticsearch
---

{% highlight terminal %}
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
sudo apt-get update && sudo apt-get install elasticsearch
{% endhighlight %}
