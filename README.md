# IRIA Knowledge Containers — Plataforma de Práticas Energéticas

> **Ecossistema Internacional Lumina & Práticas Integrativas Soberanas**  
> Desenvolvido na Europa por **CylinderMargin** & **Mestre Ricardo Rogério Pereira** (Ovar, Portugal).  
> **Registro Oficial de Propriedade Intelectual:** Safe Creative **#2610157331452**  
> Conformidade Legal: **RGPD/GDPR (União Europeia)** & **LGPD (Brasil)**  

---

## 🏛️ Visão & Fundamento Arquitetural

A **Plataforma de Práticas Energéticas** (`plataforma-praticas-energeticas`) é uma arquitetura de microsserviços soberana desenhada para hospedar, distribuir e executar verticais de ensino terapêutico e clínico sem qualquer dependência de nuvens proprietárias, CDNs bloqueáveis ou rastreadores externos.

Cada vertical opera como um **Knowledge Container autônomo** (Nginx/Alpine ultra-leve), dotado de:
1. **HTML5 Sovereign Player** com suporte a byte-range streaming MP4 sem buffering.
2. **Design Dark Naturalis / Lumina Internacional** (`#050811`, `#0B1220`, glassmorphism, sem emojis informais em elementos clínicos).
3. **Docket de Coerência Sistêmica (ICS)**: Algoritmo de mensuração autonômica e emissão de certificados criptográficos com hash auditável.
4. **Matriz Didática Padronizada** (Módulos, Lições, Fichas Clínicas e Notas do Mestre).

---

## 💎 Integração Estratégica com a `PLATAFORMA-CYLINDER`

A análise profunda da **`PLATAFORMA-CYLINDER`** revelou um acervo inestimável que foi diretamente aproveitado nesta nova arquitetura:

| Ativo da PLATAFORMA-CYLINDER | Como nos serve na Plataforma de Práticas Energéticas |
| :--- | :--- |
| **Pack01 Cyntreon Learning** (10 Cursos, 50 Módulos, 200 Lições) | Matriz curricular e ementas clínicas completas para povoar as verticais de Fitoterapia, Aromaterapia, Cromoterapia, Radiestesia, Cristais, Florais, Naturopatia, Homeopatia, Apometria e Xamanismo. |
| **12 Sistemas Terapêuticos Canónicos Naturalis** (`Cristais`, `Oils`, `Herby`, `Cromo`, `Flowers`, `Frequencies`, `Metais`, `Chakras`, `Canna`, `Epigenética`, `Geometria`, `Nutri`) | Padrão visual canónico dark (`bg-slate-900`), paleta de cores botânico-minerais e fichas técnicas de intervenção. |
| **Motor Pedagógico Soberano (`formationModel.ts`)** | Pesos de avaliação (Materiais 10%, Práticas 15%, Auto-avaliação 15%, Exame Final 20%, Certificação 40%) integrados ao cálculo do **ICS**. |
| **Dossiê Institucional do Mestre Ricardo (`lib/mestre.ts` & `CGA-founder-page.md`)** | Credenciamento do autor com 25+ anos de trajetória, 73 itens de formação e a chancela oficial da *Cylinder Global Academy*. |
| **Mecanismo de Empacotamento (`create-pack.sh` & `.clpack`)** | Inspirou e fundamentou o script `gerar-pacote.sh` que gera imagens Docker `.tar` totalmente portáteis para o aluno ou VPS. |

---

## 🧭 Os 7 Graus de Evolução Integrativa (Árvore Pedagógica Lumina)

As verticais alinham-se aos **7 Graus Canónicos de Práticas Energéticas**:

1. **Grau 1 — Fundação & Purificação Biocorpus**: Naturopatia, regulação do SNA, hidratação estruturada e desintoxicação tecidual.
2. **Grau 2 — Canalização & Imposição de Sinais**: Sistema Reiki Usui Luminar®, Biofotônica e Toque Sutil.
3. **Grau 3 — Geometria, Radiestesia & Sintonias Sutis**: Pêndulo Hebreu, Radiônica, Litoterapia e Geobiologia.
4. **Grau 4 — Apometria & Reestruturação Multidimensional**: Despolarização de memória celular, desobsessão e liberação cármica.
5. **Grau 5 — Sonologia, Frequências & Vibração Pura**: Frequências Solfeggio, Tigelas de Cristal, Ressonância 432Hz/528Hz e Cromoterapia.
6. **Grau 6 — Fitoterapia Energética & Sub-Camadas Sutis**: Fitoterapia Alquímica, Aromaterapia Clínica Vibracional e Florais de Bach.
7. **Grau 7 — Maestria, Integração & Coerência Global**: Mentoria Global Lumina, Método RPQ36 e Índice de Coerência Sistêmica (ICS).

---

## 📂 Estrutura de Diretórios

```text
plataforma-praticas-energeticas/
├── README.md                      ← Manifesto e documentação canônica
├── docker-compose.yml             ← Orquestração multi-vertical das 5 verticais
├── template/                      ← Container base oficial
│   ├── Dockerfile                 ← Nginx Alpine ultra-otimizado
│   ├── nginx.conf                 ← Streaming MP4 com Accept-Ranges e segurança
│   └── app/
│       ├── index.html             ← Shell HTML5 Dark Naturalis / Lumina
│       ├── css/style.css          ← Sistema de design com glassmorphism e responsividade
│       ├── js/player.js           ← Engine de navegação, persistência e atalhos
│       ├── js/curriculum-data.js  ← Dados estruturados da vertical
│       ├── js/docket-coerencia.js ← Algoritmo ICS e validador de certificado SHA-256
│       ├── videos/                ← Pasta local de arquivos MP4 (vídeos soberanos)
│       └── materiais/             ← PDFs, fichas técnicas e apostilas
├── scripts/
│   ├── nova-vertical.sh           ← Provisiona nova vertical (Linux / macOS)
│   ├── nova-vertical.ps1          ← Provisiona nova vertical (Windows PowerShell)
│   ├── gerar-pacote.sh            ← Exporta container soberano em .tar (Linux / macOS)
│   └── gerar-pacote.ps1           ← Exporta container soberano em .tar (Windows PowerShell)
├── pacotes/                       ← Saída dos arquivos .tar gerados para distribuição
└── verticals/
    ├── 01-pia/                    ← 33 Protocolos Integrativos Avançados (Porta 8081)
    ├── 02-reiki-usui-luminar/     ← Sistema Reiki Usui Luminar® (Porta 8082)
    ├── 03-quantica-avancada/      ← Formações Quânticas & Biofield RPQ36 (Porta 8083)
    ├── 04-integrative-therapists/ ← Vertical IRIA Integrative Therapists (Porta 8084)
    └── 05-naturalis/              ← 6 Sistemas Essenciais Naturalis (Porta 8085)
```

---

## 🚀 Como Operar a Plataforma

### 1. Criar uma Nova Vertical
Para adicionar uma nova formação (ex: `06-apometria`):

```bash
# No Linux / macOS / Git Bash:
./scripts/nova-vertical.sh 06-apometria "Apometria Quântica & Despolarização" "APO-07" 8086

# No Windows PowerShell:
.\scripts\nova-vertical.ps1 -Slug "06-apometria" -Titulo "Apometria Quântica & Despolarização" -Codigo "APO-07" -Porta 8086
```

### 2. Adicionar Vídeos e Materiais
1. Coloque seus arquivos `.mp4` em `verticals/<nome>/app/videos/`
2. Coloque seus PDFs e fichas em `verticals/<nome>/app/materiais/`
3. Ajuste os títulos e durações em `verticals/<nome>/app/js/curriculum-data.js`

### 3. Rodar Todas as Verticais via Docker Compose
```bash
docker compose up -d
```
Acesse cada vertical em sua porta designada:
- **01-pia**: [http://localhost:8081](http://localhost:8081)
- **02-reiki-usui-luminar**: [http://localhost:8082](http://localhost:8082)
- **03-quantica-avancada**: [http://localhost:8083](http://localhost:8083)
- **04-integrative-therapists**: [http://localhost:8084](http://localhost:8084)
- **05-naturalis**: [http://localhost:8085](http://localhost:8085)

### 4. Gerar Pacote Soberano (.tar) para Distribuição ao Aluno / VPS
Gera um arquivo Docker independente que roda em qualquer VPS (Coolify, Hetzner, etc.) ou computador do aluno:

```bash
# No Linux / macOS / Git Bash:
./scripts/gerar-pacote.sh 01-pia v1.0.0

# No Windows PowerShell:
.\scripts\gerar-pacote.ps1 -Slug "01-pia" -Versao "v1.0.0"
```
O pacote será salvo em `pacotes/iria-01-pia-v1.0.0.tar` acompanhado do manifesto com as instruções simples de execução:
```bash
docker load -i iria-01-pia-v1.0.0.tar
docker run -d -p 8080:80 iria-01-pia:v1.0.0
```

---

## 🛡️ Propriedade Intelectual & Responsabilidade Soberana

- **Fundador e Autor:** Mestre Ricardo Rogério Pereira
- **Entidade Certificadora:** Cylinder Global Academy / CylinderMargin
- **Jurisdição:** União Europeia (Portugal)
- **Identificador Safe Creative:** `#2610157331452`
- **Princípio Fundamental:** *"A tecnologia e as métricas devem servir a presença, a ética e o método terapêutico — nunca substituí-los."*
