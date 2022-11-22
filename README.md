This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server. Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```bash
npm run dev
# or
yarn dev
```

Next, Run the server backend to access database json:

```bash
npm run backend
```
## Features App
- Use [`Module Scss`](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)
- [`Form Validation`](https://nextjs.org/docs/guides/building-forms#javascript-based-form-validation)
- Use Form Validation [`hookform/resolvers`, `yup`](https://www.npmjs.com/package/@hookform/resolvers)
- API [`API routes`](https://nextjs.org/docs/api-routes/introduction)
- Use API Fake from Github [`The Users API`](https://docs.github.com/rest/reference/users#get-the-authenticated-user)
```
Use Cases:
For new projects, you can build your entire API with API Routes. If you have an existing API, you do not need to forward calls to the API through an API Route. Some other use cases for API Routes are:
- Masking the URL of an external service (e.g. /api/secret instead of https://company.com/secret-url)
- Using Environment Variables on the server to securely access external services like .env.production
```
- Use [`NextAuth.js`](https://next-auth.js.org/getting-started/introduction)
- Use [`swr`](https://swr.vercel.app/docs/getting-started)
- Use [`RxJS - Alert (Toaster) Notifications`](https://rxjs.dev/)
- Config [`Environment Variables`](https://nextjs.org/docs/basic-features/environment-variables)
```
- Use .env.local to load environment variables
- Expose environment variables to the browser by prefixing with NEXT_PUBLIC_ as NEXT_PUBLIC_COOKIE_PASSWORD, NEXT_PUBLIC_API_URL

```