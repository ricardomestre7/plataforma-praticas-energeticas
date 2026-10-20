# 🚀 Guia de Implantação no Coolify — Série IRIA

> **Projeto Coolify:** `IRIA`  
> **Nome Internacional:** `IRIA — International Regenerative & Integrative Academy`  
> **Repositório Oficial:** `https://github.com/ricardomestre7/plataforma-praticas-energeticas`  
> **Branch:** `main`  
> **Chancela & Autoria:** Mestre Ricardo Rogério Pereira | Safe Creative **#2610157331452**  

---

## 🏛️ Configuração no Painel do Coolify

### 1. Criar o Projeto e Ambiente
1. No menu lateral do Coolify, clique em **Projects** → **+ Add Project**.
2. Preencha os dados:
   * **Name:** `IRIA` (ou `IRIA Global`)
   * **Description:** `International Regenerative & Integrative Academy — Knowledge Containers & Sovereign Practice`
3. Entre no projeto e selecione o ambiente padrão: `production`.

---

### 2. Adicionar o Repositório como "Docker Compose"
1. Dentro do projeto **IRIA**, clique em **+ New Resource**.
2. Selecione **Docker Compose**.
3. Escolha **GitHub Public Repository** (ou Privado com chave SSH):
   * **Repository URL:** `https://github.com/ricardomestre7/plataforma-praticas-energeticas`
   * **Branch:** `main`
   * **Compose File Path:** `docker-compose.yml` (raiz)
4. Clique em **Save & Deploy**.

O Coolify irá compilar automaticamente as imagens Nginx/Alpine ultra-leves e subir as **5 Verticais Core** em containers isolados.

---

## 🌐 Convenção Internacional de Subdomínios (Série IRIA)

Dentro das configurações de cada serviço no Coolify, defina o **Domains / FQDN** de acordo com a sua preferência (substitua `seudominio.com` pelo seu domínio oficial, como `iria.global`, `cylindermargin.com` ou similar):

| Serviço no Compose | Porta Interna | Sugestão de Subdomínio Internacional | Núcleo Terapêutico |
| :--- | :---: | :--- | :--- |
| **`pia-33`** | `80` (Mapeada: 8081) | `https://pia.seudominio.com` | 33 Protocolos Integrativos Avançados |
| **`reiki-luminar`** | `80` (Mapeada: 8082) | `https://reiki.seudominio.com` | Sistema Reiki Usui Luminar® |
| **`quantica-avancada`** | `80` (Mapeada: 8083) | `https://quantica.seudominio.com` | Formações Quânticas & Biofield RPQ36 |
| **`integrative-therapists`**| `80` (Mapeada: 8084) | `https://therapists.seudominio.com` | Vertical IRIA Integrative Therapists |
| **`naturalis-sistemas`** | `80` (Mapeada: 8085) | `https://naturalis.seudominio.com` | 6 Sistemas Essenciais Naturalis |

---

## 🛡️ Vantagens do Modelo Soberano IRIA no Coolify

* **Zero Banco de Dados:** Consumo de CPU e RAM quase nulo (< 15MB de RAM por vertical).
* **Streaming Nativo MP4:** Configurado com diretiva Nginx `mp4;` e cabeçalhos `Accept-Ranges bytes;` — o vídeo inicia instantaneamente e permite avanço rápido sem travar.
* **Docket de Coerência ICS:** Funciona no cliente (local do navegador) com persistência soberana e emissão de certificado criptográfico auditável.
* **Certificação Automática SSL (HTTPS):** O Coolify gera e renova os certificados Let's Encrypt automaticamente para cada subdomínio.

---

*IRIA Global • Qualidade Europeia a Nível Internacional • Ovar, Portugal*
