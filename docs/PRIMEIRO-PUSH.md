# Você já criou o repositório. Faça só isto.

Substitua **SEU_USUARIO** e **NOME-DO-REPO** pelo que aparece na barra do GitHub.
Exemplo de URL: `https://github.com/joao/fatbull-racing-overlay.git`

---

## A. O código já está no seu PC (pasta extraída / baixada)

Abra o **Git Bash** ou **PowerShell** **dentro da pasta do projeto** (onde existem `package.json` e `src`).

```bash
git init -b main
git add .
git commit -m "feat: primeira versão FatBull Racing Overlay"
git remote add origin https://github.com/SEU_USUARIO/NOME-DO-REPO.git
git push -u origin main
```

Se o GitHub pedir senha, **não use a senha da conta**. Crie um token:

1. GitHub → foto → **Settings**
2. **Developer settings** (bem no final da esquerda)
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token**
4. Marque `repo`
5. Copie o token e cole no lugar da senha

Se aparecer `remote origin already exists`:

```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/NOME-DO-REPO.git
git push -u origin main
```

Se o GitHub já criou um README no repo vazio:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## B. Conferir se funcionou

Atualize a página do repositório no navegador. Você deve ver pastas `src`, `public`, `docs`, `README.md`.

No PC, na mesma pasta:

```bash
npm install
npm run dev
```

Abra **http://localhost:5173**

---

## C. Colocar o site no ar (depois do push)

1. https://app.netlify.com → **Log in with GitHub**
2. **Add new site → Import an existing project**
3. Escolha este repositório
4. Build command: `npm run build`
5. Publish directory: `dist`
6. **Deploy**

Pronto: URL pública + cada `git push` republica sozinho.

---

## D. Próxima alteração

```bash
git add .
git commit -m "feat: descreva o que mudou"
git push
```
