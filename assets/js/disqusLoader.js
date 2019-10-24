/*
    disqusLoader.js v1.0
    A JavaScript plugin for lazy-loading Disqus comments widget.
    -
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
*/
(function(b,f,l){var r=function(a){a=a.getBoundingClientRect();return{top:a.top+f.body.scrollTop,left:a.left+f.body.scrollLeft}},t=function(a,c){var d=f.createElement("script");d.src=a;d.async=!0;d.setAttribute("data-timestamp",+new Date);d.addEventListener("load",function(){"function"===typeof c&&c()});(f.head||f.body).appendChild(d)};l=function(a,c){var d,e;return function(){var g=this,f=arguments,b=+new Date;d&&b<d+a?(clearTimeout(e),e=setTimeout(function(){d=b;c.apply(g,f)},a)):(d=b,c.apply(g,
f))}};var m=!1,n=!1,p=!1,k=!1,h="unloaded",e=!1,q=function(){if(!e||!f.body.contains(e)||"loaded"==e.disqusLoaderStatus)return!0;var a=b.pageYOffset,c=r(e).top;if(c-a>b.innerHeight*n||0<a-c-e.offsetHeight-b.innerHeight*n)return!0;(a=f.getElementById("disqus_thread"))&&a.removeAttribute("id");e.setAttribute("id","disqus_thread");e.disqusLoaderStatus="loaded";"loaded"==h?DISQUS.reset({reload:!0,config:p}):(b.disqus_config=p,"unloaded"==h&&(h="loading",t(k,function(){h="loaded"})))};b.addEventListener("scroll",
l(m,q));b.addEventListener("resize",l(m,q));b.disqusLoader=function(a,c){var d={laziness:1,throttle:250,scriptUrl:!1,disqusConfig:!1},b=c,g,h={};for(g in d)Object.prototype.hasOwnProperty.call(d,g)&&(h[g]=d[g]);for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(h[g]=b[g]);c=h;n=c.laziness+1;m=c.throttle;p=c.disqusConfig;k=!1===k?c.scriptUrl:k;e="string"===typeof a?f.querySelector(a):"number"===typeof a.length?a[0]:a;e.disqusLoaderStatus="unloaded";q()}})(window,document,0); 