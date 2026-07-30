# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File                     | URL                                                     |
| ------------------------ | ------------------------------------------------------- |
| `routes-DLyvSB-9.js:15 Video Loaded: Object
index-BEp3kZwP.js:12 TypeError: Cannot read properties of undefined (reading 'toString')
    at routes-DLyvSB-9.js:70:75800
    at Array.map (<anonymous>)
    at Os (routes-DLyvSB-9.js:70:75755)
    at ko (index-BEp3kZwP.js:9:47540)
    at yc (index-BEp3kZwP.js:9:70044)
    at Ic (index-BEp3kZwP.js:9:80320)
    at Lu (index-BEp3kZwP.js:9:115727)
    at Pu (index-BEp3kZwP.js:9:114808)
    at Nu (index-BEp3kZwP.js:9:114646)
    at xu (index-BEp3kZwP.js:9:111164)
tx @ index-BEp3kZwP.js:12
index-BEp3kZwP.js:12 TypeError: Cannot read properties of undefined (reading 'toString')
    at routes-DLyvSB-9.js:70:75800
    at Array.map (<anonymous>)
    at Os (routes-DLyvSB-9.js:70:75755)
    at ko (index-BEp3kZwP.js:9:47540)
    at yc (index-BEp3kZwP.js:9:70044)
    at Ic (index-BEp3kZwP.js:9:80320)
    at Lu (index-BEp3kZwP.js:9:115727)
    at Pu (index-BEp3kZwP.js:9:114808)
    at Nu (index-BEp3kZwP.js:9:114646)
    at xu (index-BEp3kZwP.js:9:111512)
tx @ index-BEp3kZwP.js:12
index-BEp3kZwP.js:9 TypeError: Cannot read properties of undefined (reading 'toString')
    at routes-DLyvSB-9.js:70:75800
    at Array.map (<anonymous>)
    at Os (routes-DLyvSB-9.js:70:75755)
    at ko (index-BEp3kZwP.js:9:47540)
    at yc (index-BEp3kZwP.js:9:70044)
    at Ic (index-BEp3kZwP.js:9:80320)
    at Lu (index-BEp3kZwP.js:9:115727)
    at Pu (index-BEp3kZwP.js:9:114808)
    at Nu (index-BEp3kZwP.js:9:114646)
    at xu (index-BEp3kZwP.js:9:111512)`              | `/`                                                     |
| `about.tsx`              | `/about`                                                |
| `users/index.tsx`        | `/users`                                                |
| `users/$id.tsx`          | `/users/:id` (dynamic — bare `$`, no curly braces)      |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment)                  |
| `files/$.tsx`            | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx`            | layout route (renders children via `<Outlet />`)        |
| `__root.tsx`             | app shell — wraps every page; preserve `<Outlet />`     |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
