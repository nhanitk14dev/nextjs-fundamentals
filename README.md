This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Config environment variables: (https://nextjs.org/docs/basic-features/environment-variables) 
```bash
cmd:  cp .env.local.example .env.local
- Use .env.local to load environment variables
- Expose environment variables to the browser by prefixing with NEXT_PUBLIC_ as NEXT_PUBLIC_COOKIE_PASSWORD, NEXT_PUBLIC_API_URL
```

2. Run command line to start project:
```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Features App



## Learn More
- Use [`Module Scss`](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css). We use [`Css styles module`](https://github.com/css-modules/css-modules)

- Form Validation [`Next Form Validation`](https://nextjs.org/docs/guides/building-forms#javascript-based-form-validation), use [`yup & hookform/resolvers`](https://www.npmjs.com/package/@hookform/resolvers)
- API [`API routes`](https://nextjs.org/docs/api-routes/introduction)
```
Use Cases:
For new projects, you can build your entire API with API Routes. If you have an existing API, you do not need to forward calls to the API through an API Route. Some other use cases for API Routes are:
- Masking the URL of an external service (e.g. /api/secret instead of https://company.com/secret-url)
- Using Environment Variables on the server to securely access external services like .env.production
```
- Use [`NextAuth.js`](https://next-auth.js.org/getting-started/introduction)
- Use React Hooks for Data Fetching [`SWR`](https://swr.vercel.app/docs/getting-started)
- Use [`RxJS - Alert (Toaster) Notifications`](https://rxjs.dev/)
- Config [`Environment Variables`](https://nextjs.org/docs/basic-features/environment-variables)

- Middleware Authentication with [`Iron session`](https://www.npmjs.com/package/iron-session#nextjs-middlewares-usage). For code demo: [`Link`](https://codesandbox.io/s/plc9c). Middleware [`How to create a generic protected route in Next.js`](https://shipsaas.com/blog/create-protected-route-nextjs) or [`Use Next.js Middleware`](https://www.ctnicholas.dev/articles/how-to-use-nextjs-middleware)


## FAQ
1. Why we use [`SWR`](https://swr.vercel.app/docs/getting-started)?:
- Traditionally, we fetch data once using useEffect in the top level component, and pass it to child components via props. Usually, we need to keep all the data fetching in the top level component and add props to every component deep down the tree. The code will become harder to maintain if we add more data dependency to the page.
- SWR solves the above problem. With the useUser hook we just created, the code can be refactored, all components are independent to each other, Fast, lightweight and reusable data fetching, Built-in cache and request deduplication, ...

