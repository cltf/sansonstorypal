FROM nginx:alpine

# 复制前端文件
COPY user/ /usr/share/nginx/html/user/
COPY admin/ /usr/share/nginx/html/admin/

# 复制Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
