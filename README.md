# Issue

- https://github.com/vercel/next.js/issues/83630

# Bug fixed on `next@16.0.0-canary.13`

- https://github.com/vercel/next.js/issues/83630#issuecomment-3419065048

Everything related to the issue is fixed via this commit:

> fix(package.json): 🐛 bump next to 16.0.0-canary.14 to avoid build error

# Bug description

With `next@15.5.2`, importing `esbuild` inside **Server Components** and **Route Handlers** results in a **Build error**, even declaring it in `serverExternalPackages`.

## To reproduce the issue:

Building the app with **Turbopack** like so:

```sh
npm i
npx next build --turbopack
```

fails with this message:

```
> Build error occurred
[Error: Turbopack build failed with 1 errors:
./node_modules/@esbuild/darwin-x64/bin/esbuild
Reading source code for parsing failed
An unexpected error happened while trying to read the source code to parse: failed to convert rope into string

Caused by:
- invalid utf-8 sequence of 1 bytes from index 0
```

contrary to building the app without **Turbopack**, like so:

```sh
npx next build
```

In development mode:

```sh
npx next dev --turbopack
```

everything works fine.

## To investigate

Everything related to the issue is included only in this commit:

> feat(app & next.config.ts): ✨ fetch JSX from string using esbuild

## Notes:

- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- The functioning build without **Turbopack** was deployed here:\
  https://bug-report-turbopack-esbuild.vercel.app/

- This repository was created only to report this bug. So the codebase was made as minimalistic as possible and the purpose is not to discuss a way to avoid using `esbuild`, except if there's a better way _(via another package for instance)_ to transpile a string _(with the content of a JSX file)_ into a ESM.\
  In a real-world application, there's a genuine interest having to transpile a JSX file _(stored as a string in a DB for instance)_ into a ESM that can be imported in a Client Component.

# Questions

### 1. `serverExternalPackages` in `next.config.ts`

To avoid a **Build Error** in the **Route Handler**, I set the file like so:

```ts
const nextConfig: NextConfig = {
  serverExternalPackages: ["esbuild"],
};
```

but maybe there's a better configuration.\
If so, I would like to know what would be the proper one.

### 2. `webpackIgnore` in `page.tsx`

To avoid a **Build Error** in the **Client Component**, I put `/* webpackIgnore: true */` before the module path in the import call, like so:

```tsx
// prettier-ignore
const fetchedModule = await import(
  /* webpackIgnore: true */ modulePath
)
```

I'm wondering if there would be a better way to do so.\
If not, at least, it would be good to rename `webpackIgnore` and to avoid having to put `: true` for a concise syntax.
