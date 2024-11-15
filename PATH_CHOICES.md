## 1.

Chosen `Angular` as front-end framework

Alternatives:

- React
- Vue + Vite

## 2.

Chosen `NPM` as package manager

## 3.

Chosen `PrimeNG` as UI library

Alternatives:

- Angular Material
- NGBootstrap

## 4.

Chosen `JSON Server` as mock server

Alternatives:

- MirageJS
- MSW

## 5.

Used for common practices:

- `Angular Environment` for environment variables
- `Angular Routing` for navigation
- `Angular Guards` for route protection
- `Angular Interceptors` for HTTP requests

## 6.

Used for pattern practices:

- `MVC Architecture` for project structure
- `Features` for folder structure
  - Inside each feature:

        |-- /model
        |-- /services
        |-- /pages
        |-- /components
        |-- /guards
        |-- /interceptors
        |-- /enums
        |-- /constants

## 7.

About deprecations:

- Didn't use `HTTPClientModule` import, used `provideHttpClient()` as provider


