---
layout: post
title:  "NGINX Primer"
date:   2022-12-25
categories: deployment-and-infrastructure
excerpt_separator: <!--Read Now-->
---
Learn what is NGINX, standard terminologies and basic configurations for using NGINX for reverse-proxy and load balancing.
<!--Read Now-->
# NGINX
## What is NGINX
To start with NGINX, we can say that it is a web server and serves web content. While NGINX is more than a web server. It has three primary applications 

### Reverse Proxy
![Reverse Proxy Image](/assets/nginx/reverse-proxy.png "Fig 1: Reverse Proxy")

When a client requests for a resource the web server is the one which serves the requested resources. However, to make a scalable application we insert a middle man in the request response cycle. This middle man is responsible for recieving the request from the client, passing the request to the actual web server, recieving the response from web server and sending the response to the client. This middle man is called a reverse proxy. In the figure above NGINX is the middle man (reverse proxy)

### Load Balancer
![Load Balancer Image](/assets/nginx/load-balancer.png "Fig 2: Load Balancer") 

I talked about scalability in reverse proxy section. When the number of requests increases for an appliation, having a single web server can lead to higher traffic for the server which will increase the latency of the requests. To solve this, we can use multiple web server. But the problem of having multiple web servers is that, the client needs the information of all the servers to send the request to the appropriate server. In this case, we can use NGINX as a load balancer which will decided which server is free and send ths request to the appropriate server. The client only needs the information of NGINX in this case.

### Encryption
![Encryption Image](/assets/nginx/encyption.png "Fig 3: Encryption")

Most of the websites are HTTPS secured. Having multiple servers poses the problem of encrypting all the web servers. But if we are using NGINX we can only apply the encryption in NGINX and it will take care of all the encryption and decryption we need.

## Installation
### On Mac
```shell
    >> brew install nginx
```
Creates a directory at `/usr/local/etc/nginx`. `nginx.conf` is the file which contains the configurations. To start nginx use the command below
```shell
    >> nginx
```

## Terminology
Configurations are present in key-value pairs. We also have blocks. The key-value pairs are called `directives` and the blocks are called `context`. In example below, `events` is a context and `worker_connection 1024` is a directive. THe context contains the directives.
```nginx
    events {
        worker_connections 1024
    }
```     
## Serving Static Content
HTML files, CSS file and images are static content. To serve a static website present at `/localdata/demo_site/` we need to do the following configurations in the `nginx.conf` file.
```nginx
    http {
        server {
            listen 8080
            root /localdata/demo_site/
        }
    }

    events { }
```
`events` context is required for nginx to run. When we launch server at 8080 port the nginx server will server the `index.html` present at `/localdata/demo_site/`. To restart the nginx server
```shell
    >> nginx -s reload
```
## MIME Types
By default nginx will server all the files as `Content-type: text/plain`. This will prevent any CSS styles to be applied on the HTML pages. To change this we need to set the MIME types in `nginx.conf` file.
```nginx
    http {

        types {
            text/css    css;
            text/html   html;
        }

        server {
            listen 8080;
            root /localdata/demo_site/;
        }
    }

    events { }
```
It can be difficult to remember all the MIME types. NGINX provides a file `mime.type` which we can refer to for all the MIME types. To make things better we can include the file in out `nginx.conf` file.
```nginx
    http {
        
        include mime.types;

        server {
            listen 8080;
            root /localdata/demo_site/;
        }
    }

    events { }
```
## Location Block
Suppose we want to serve a subfolder present inside our root folder `/localdata/demo_site/` named `sub1` which contains its own `index.html` file. We want to load this `/localdata/demo_site/sub1/index.html` when we hit url `http://server:8080/sub1`. To do this we can use location block

### `location` context and `root` directive
```nginx
    http {
        
        include mime.types;

        server {
            listen 8080
            root /localdata/demo_site/;

            location /sub1 {
                root /localdata/demo_site/;
            }
        }
    }

    events { }
```
### `alias` directive
If we want to reuse a location for a different URL we can use `alias` directives
```nginx
    http {
        
        include mime.types;

        server {
            listen 8080
            root /localdata/demo_site/;

            location /sub1 {
                root /localdata/demo_site/;
            }

            location /sub2 {
                alias /localdata/demo_site/sub1;
            }
        }
    }

    events { }
```
The config above will server the `/localdata/demo_site/sub1/index.html` file when we hit URL `http://server:8080/sub2`.

### `try_files` directive
When we want to serve files named other than index.html when we hit a location we can use the `try_files` directive to specify those files. We can also provide the alternate files if the primary file is not found. Also, we can configure the error code if none of the mentioned files are found.
```nginx
    http {
        
        include mime.types;

        server {
            listen 8080
            root /localdata/demo_site/;

            location /sub1 {
                root /localdata/demo_site/;
            }

            location /test {
                root /localdata/demo_site/;
                try_files /test/test.html /index.html =404
            }
        }
    }

    events { }
```
The `/test` location first tries to load the `/localdata/demo_site/test/index.html`. If the file is not found, then it tries to load the `/localdata/demo_site/test/test.html` file. If that file is also not found, the root index file `/localdata/demo_site/index.html` is served. If none, of the files are found `404 error` page is shown.

## Using regular expression
```nginx
    location ~* /count/[0-9] {
            root /localdata/demo_site/;
            try_files /index.html =404;
    }
```
Uisng a configuration context like above we can redirect the request to `server:8080/count/1`, `server:8080/count/2` or `server:8080/count/8` to `/localdata/demo_site/index.html`.

## Redirects and Rewrites
```nginx
    location /redirectthis {
        return 307 /redirectto
    }
```
A config like above enables redirection. When we hit URL `server:8080/redirectthis` we will be redirected to `server:8080/redirectto`. The **307** number is the HTTP redirect code.
Suppose, we don't want redirect and rather want rewrite (Rewrite will also server the resource at `server:8080/redirectto` but the URL will stay as `server:8080/redirectthis`)
```nginx
    rewrite /redirectthis /redirectto
    rewrite ^/number/(\w+) /count/$1
    location ~* /count/[0-9] {
        root /localdata/demo_site/;
        try_files /index.html =404;
    }
```
`server:8080/number/1` forwards to `server:8080/count/1` while the URL being `server:8080/number/1`.


## Load Balancer
Load balancer uses round robin approach. Consider that we have 4 instances of a web server running in a docker container. The web servers are running at `localhost:1111`, `localhost:2222`, `localhost:3333` and `localhost:4444`. We want when we hit the NGINX server it serves one of these 4 instances. To do this we need the `upstream` context and `proxy_pass` directive.

    upstream backendserver {
        server 127.0.0.1:1111;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
    }

    server {
        listen 8080;
        location / {
            proxy_pass http://backendserver/;
        }
    }

This configuration will enable the load balancer. `backendserver` is a variable name.

