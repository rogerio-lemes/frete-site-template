# 🚛 Como Personalizar o Template para um Novo Cliente

## Estrutura de arquivos que você vai editar

```
src/
  config/
    empresa.ts            ← ✅ ARQUIVO PRINCIPAL — edite aqui primeiro
  assets/
    logo-lucio.webp       ← substitua pelo logo do cliente
    avatar-atendente.webp ← foto do atendente (bot flutuante)
    galeria-1.webp        ← fotos de trabalhos realizados (1 a 6)
    galeria-2.webp
    galeria-3.webp
    galeria-4.webp
    galeria-5.webp
    galeria-6.webp
  styles.css              ← cores do site
index.html                ← título, meta tags e schema SEO
```

---

## Passo 1 — Edite `src/config/empresa.ts`

Abra o arquivo e preencha todos os campos:

| Campo | O que é |
|---|---|
| `nome` | Nome da empresa |
| `cidade` / `regiao` | Localização |
| `telefone` / `telefoneRaw` | Telefone formatado e só números com DDI |
| `googleReviewLink` | Link direto para avaliação no Google |
| `waMensagemPadrao` | Mensagem que abre no WhatsApp |
| `services` | Lista de serviços (título + descrição) |
| `benefits` | Diferenciais da empresa |
| `steps` | Como funciona (3 etapas) |
| `testimonials` | Depoimentos de clientes |
| `faqs` | Perguntas e respostas |

---

## Passo 2 — Substitua as imagens em `src/assets/`

| Arquivo | Tamanho recomendado | O que é |
|---|---|---|
| `logo-lucio.webp` | 200×200px | Logo da empresa |
| `avatar-atendente.webp` | 400×400px | Foto do atendente (bot) |
| `galeria-1.webp` | 800×600px | Foto de serviço realizado |
| `galeria-2.webp` | 800×600px | Foto de serviço realizado |
| `galeria-3.webp` | 800×600px | Foto de serviço realizado |
| `galeria-4.webp` | 800×600px | Foto de serviço realizado |
| `galeria-5.webp` | 800×600px | Foto de serviço realizado |
| `galeria-6.webp` | 800×600px | Foto de serviço realizado |

> Mantenha os mesmos nomes de arquivo — só substitua o conteúdo.

---

## Passo 3 — Ajuste as cores em `src/styles.css`

Procure as variáveis no início do arquivo:

```css
--primary: oklch(0.45 0.16 143);       /* cor principal (verde) */
--gradient-hero: linear-gradient(...); /* gradiente do hero */
--gradient-cta: linear-gradient(...);  /* gradiente dos botões CTA */
```

**Referência de hue (matiz) para oklch:**
| Cor | Hue |
|---|---|
| Verde | `143` |
| Azul | `250` |
| Laranja | `50` |
| Vermelho | `25` |
| Roxo | `300` |

---

## Passo 4 — Atualize `index.html`

```html
<title>EMPRESA | Serviço na Cidade</title>
<meta name="description" content="...">
<meta property="og:url" content="https://seudominio.com.br/">
<link rel="canonical" href="https://seudominio.com.br/">
```

E no schema JSON-LD:
```json
"name": "Nome da Empresa",
"telephone": "+55-xx-xxxxx-xxxx",
"url": "https://seudominio.com.br/"
```

---

## Passo 5 — Substitua os favicons em `public/`

| Arquivo | Tamanho |
|---|---|
| `favicon-16x16.png` | 16×16px |
| `favicon-32x32.png` | 32×32px |
| `apple-touch-icon.png` | 180×180px |

---

## Passo 6 — Rode e publique

```bash
npm install       # instalar dependências
npm run dev       # visualizar localmente
npm run build     # build para produção
```

---

## Checklist final

- [ ] `src/config/empresa.ts` preenchido
- [ ] Logo substituído
- [ ] Fotos da galeria substituídas
- [ ] Avatar do atendente substituído
- [ ] Favicons atualizados
- [ ] Cores ajustadas em `styles.css`
- [ ] `index.html` com título e meta corretos
- [ ] Schema JSON-LD atualizado
- [ ] WhatsApp testado
- [ ] Link Google testado
- [ ] Site revisado no mobile
