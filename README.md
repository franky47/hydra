# hydra

One page, four frameworks, all synced via the URL, using [nuqs](https://nuqs.47ng.com).

https://github.com/user-attachments/assets/e3fedfb9-db32-403a-b689-b9425410a856

## What?

The root app is a Next.js app router app, rendering subtrees using other
adapters for React SPA and React Router.

It also provides a mount point for a Vue.js app built separately with Vite,
and loaded via a script tag (with a custom vue-router implementation to make it
follow _external_ shallow URL updates originating from the other frameworks).

## Why?

Why not?

## Should I do this in production?

No.

## How do I run this?

```bash
$ pnpm install
$ pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).
