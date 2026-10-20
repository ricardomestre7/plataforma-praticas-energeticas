FROM nginx:alpine

# Metadados Soberanos IRIA / Lumina
LABEL maintainer="Ricardo Rogério Pereira <ricardomestre7>"
LABEL registration="Safe Creative #2610157331452"
LABEL system="IRIA Sovereign Central Platform & Knowledge Containers Hub"

# Remover configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copiar configuração Nginx otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar portal central soberano
COPY hub /usr/share/nginx/html

# Permissões adequadas
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
