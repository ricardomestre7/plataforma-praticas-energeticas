FROM nginx:alpine

# Metadados Soberanos IRIA / Lumina
LABEL maintainer="Ricardo Rogério Pereira <ricardomestre7>"
LABEL registration="Safe Creative #2610157331452"
LABEL system="IRIA Sovereign Central Platform & Knowledge Containers Hub"

# Instalar curl para healthchecks robustos em IPv4 e IPv6
RUN apk add --no-cache curl

# Remover configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copiar configuração Nginx otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar portal central soberano
COPY hub /usr/share/nginx/html

# Permissões adequadas
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=3s --retries=3 \
  CMD curl -f http://127.0.0.1:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
