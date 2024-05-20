## 1.

Write `git init` and then `npm install`

## 2.

Write

1. `npm install axios@^1.3.5`
2. `npm install primeflex@^3.3.0`
3. `npm install primeicons@^6.0.1`
4. `npm install primevue@^3.26.1`
5. `npm install -g json-server@0.17.4` or alternatively `npm install json-server@0.17.4`
6. `npm install vue-router@4`
7. `npm install vue-i18n@9`

###### You could also include firebase here

## 3.

Create folder `server` (project-name/server)

## 4.

Create file `db.json` inside `server` and add FAKE API content in it

## 5.

Create file `routes.json` inside `server` and write:

    {
        "/api/v1/*": "/$1"
    }

## 6.

Create file `start.sh` inside `server` optionally and write

    json-server --watch db.json --routes routes.json

## 7.

In a new terminal, copy and paste what's inside `start.sh`.

Or copy it directly:

    json-server --watch db.json --routes routes.json

## Theory.

Por el bien de escribir rápido este documento, cuando escribo algo como

    shared/services/http-common.js

Significa crear un folder en `src` llamado `shared`, crear un folder en `shared` llamado `services` y finalmente crear el archivo `http-common.js` adentro de `services`, si ya existe el folder úsalo, si no lo creas, así voy a escribir todo

## 8.

Time to add i18n support and initial declaration of JSONs,

Create `locals/en.json` and `locals/es.json`, `New Files`, and write the content in spanish and english with the same identifiers (can be ordered)

      {
         [page-name] {
            [text-name-1] {
               "eng-text"
            },
            [text-name-2] {
               "eng-text"
            }
         }
      }

Then, create `i18n.js` in `src` (`src/i18n`) and write this

    import {createI18n} from "vue-i18n";
    import en from "./locales/en.json";
    import es from "./locales/es.json";

    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        globalInjection: true,
        messages: { en, es }
    });

    export default i18n;

## 9.

Create `shared/services/http-common.js`, a `JavaScript File`, and write the following:

    import axios from 'axios';

    export default axios.create({
        baseURL: 'http://localhost:3000/api/v1',
        headers: { 'Content-type': 'application/json' }
    });

###### In baseUrl you will input the main URL to the Fake API that will be used (in exams case, always localhost:3000 and more)

## 10.

Create `shared/services/base.service.js`, a `JavaScript File`, and write the following:

    import http from "./http-common.js";

    export class BaseService {
        complementUrl;

        getAll() {
            return http.get(this.complementUrl);
        }
        getById(id) {
            return http.get(`${this.complementUrl}/${id}`);
        }
        create(data) {
            return http.post(this.complementUrl, data);
        }
        update(id, data) {
            return http.put(`${this.complementUrl}/${id}`, data);
        }
        delete(id) {
            return http.delete(`${this.complementUrl}/${id}`);
        }
    }

## 11.

Router begins,

Create `router/index.js`, a JavaScript File, and write the following

    import { createRouter, createWebHistory } from 'vue-router'

    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            (Include all routes here)
        ]
    })
    
    export default router

## 12.

'Write what should be in main.js'

    import { createApp } from 'vue'
    import './style.css'

    import App from './App.vue'

    import router from './router';
    import i18n from "./i18n.js";

    import ToastService from "primevue/toastservice";
    import PrimeVue from "primevue/config";

    // PrimeVue Material Design Theme
    import "primevue/resources/themes/md-light-indigo/theme.css";
    import "primevue/resources/primevue.min.css";
    import "primeicons/primeicons.css";

    // Add PrimeFlex
    import "primeflex/primeflex.css";

    // PrimeVue Components
    import DataTable from "primevue/datatable";
    import Column from "primevue/column";
    import Toolbar from "primevue/toolbar";
    import InputText from "primevue/inputtext";
    import Textarea from "primevue/textarea";
    import Button from "primevue/button";
    import Row from "primevue/row";
    import Sidebar from "primevue/sidebar";
    import Menu from "primevue/menu";
    import Dialog from "primevue/dialog";
    import Toast from "primevue/toast";
    import Dropdown from "primevue/dropdown";
    import Tag from "primevue/tag";
    import Card from "primevue/card";
    import SelectButton from "primevue/selectbutton";

    createApp(App)
        .use(router)
        .use(PrimeVue, { ripple: true })
        .use(ToastService)
        .use(i18n)
        .component('pv-data-table', DataTable)
        .component("pv-column", Column)
        .component('pv-toolbar', Toolbar)
        .component('pv-select-button', SelectButton)
        .component('pv-input-text', InputText)
        .component('pv-textarea', Textarea)
        .component('pv-button', Button)
        .component('pv-row', Row)
        .component('pv-sidebar', Sidebar)
        .component('pv-menu', Menu)
        .component('pv-dialog', Dialog)
        .component('pv-toast', Toast)
        .component('pv-dropdown', Dropdown)
        .component('pv-tag', Tag)
        .component('pv-card', Card)
        .mount('#app')

## 13.

Before anything:

1. Get rid of everything in `styles.css`
2. To make it all look better, add to styles.css the following

        * {
            margin: 0;
        }

3.  Get rid of everything in `App.vue`'s template
4. Get rid of everything in `App.vue`'s style and remove 'scoped'
5. Get rid of everything in `App.vue`'s script and remove 'setup'
6. To make it ready to work, in `App.vue`'s script write the following

         export default {
            name: "App",
            props: [], // for everything except App.vue
            data() { return {} },
            created() {},
            methods: {},
         }

7. Get rid of everything in `src/components`

Now you're ready to work

## 14.

Time to think how you are going to deal the routes in here following the next definition:

Group of pages: Pages with things in common

**Single group of pages**

Put RouterView in App.vue, use App.vue to put common elements and, maybe, you will not use children

**Many groups of pages**

###### AKA there's a group with similar things, another that doesn't share anything with that first group

Put RouterView in App.vue, don't write anything else in App.vue, and you will use children where each father component will have a RouterView

## 15.

Time to write the routes in `router/index.js` (this could've been done in Step 13.)

Here's the structure

1. Father / Child

         path: '/login',
         name: 'login',
         component: () => import('../iam/pages/log-in.view.vue'),
         props: true,
2. Redirect

       {
          path: '/',
          redirect: 'home'
       },
3. Page not found

       {
          path: '/:notFound',
          component: () => import('../shared/pages/page-not-found.component.vue')
       },

Here's how it's practically

    routes: [
        // Fathers in Many Groups of Pages
        // AKA Children in Single Group of Pages
        {
            path: '/login',
            name: 'login',
            component: () => import('../iam/pages/log-in.view.vue'),
            props: true,
        },
        {
            path: '/:id',
            name: 'workspace',
            component: () => import('../views/workspace.view.vue'),
            props: true,
        // Children of Father 'workspace'
            children: [
                {
                    path: '/:id/workspace',
                    name: 'due_diligence',
                    component: () => import('../due-diligence/pages/my-projects.vue'),
                    props: true,
                },
                {
                    path: '/:id/workspace/:project_id/:user_type',
                    name: 'due_diligence/project',
                    component: () => import('../due-diligence/pages/project-showcase.vue'),
                    props: true,
                },
                {
                    path: '/:id/qa/:project_id/:user_type',
                    name: 'qa',
                    component: () => import('../qa/pages/qa-showcase.vue'),
                    props: true,
                },
                {
                    path: '/:id/project_creation',
                    name: 'project_creation',
                    component: () => import('../pending-projects/pages/pending-projects.vue'),
                    props: true,
                },
                {
                    path: '/:id/settings',
                    name: 'settings',
                },
                {
                    path: '/:id/settings/:project_id/:user_type',
                    name: 'settings_project',
                },
            ],
        },
        // Redirect in Start
        {
            path: '/',
            redirect: 'login'
        },
    ]

###### Remember to write props: true in every single one to allow formal communication between father component and children component

**Formal Communication of Father and Children:** father can edit children, children can send events to father to edit them

## 16.

Now you can write RouterViews and RouterLinks freely

### Common Errors

Remember, to make an HTML attribute link to a JavaScript component you have to write ':name' rather than 'name:'

### Router-Links:

Attributes:

      items: [
        { label: "My Projects", to: "/my-projects" },
      ],

## 17.

Time to create:

1. Bounded Contexts
2. Services
3. Pages
4. Components (Indented Components)

## Theory.

**Pages:** Components that don't appear as HTML elements in other components

###### Logically, App.vue is a page, every father is a page

###### All children are pages, surprisingly, there's a big difference of appearing as an HTML element and RouterView state

**Components:** Components as HTML elements in other components

###### A component isn't a child, they are mutually exclusive

**Father:** Main Component in a Group of Pages that has the RouterView for its Children and the shared HTML elements for that group

###### Logically, all fathers are children of App.vue

**Children:** Components utilized in the RouterView of a Father

###### A child isn't a component, a child can have components

**Group of Pages:** Pages that, in design, share some HTML elements. Thus, have a Father with those elements and each difference as a Child that appears in RouterView

###### In theory, a Group of Pages isn't required to identify, but it's bad practice if pages share elements

## Communication

**Formal Communication of Pages and Components:** Pages can edit components, components can send events to pages to edit them

## Main Vue Theory

**Component Segments:**

1. **data()** == Angular Attributes
2. **created()** == Constructor and ngOnInit
3. **methods:** == Angular Functions

**Attributes:** Data stored internally or presented externally

**Methods:** Functions called internally.

###### "methods:" in Components Segments actually refers to functions

**UI Handlers:** Functions called externally by HTML elements.

**Event Handlers:** Functions called externally by RouterView states.

# i18n

## 1.

Replace writing in wanted HTML texts with

      {{ $t('[page-name].[text-name-x]') }}

## 2.

**Implementation Pattern,**

Create HTML Language Switcher pattern,

As `<app-language-switcher>`:

    // JavaScript
    export default {
       name: "language-switcher.component",
       data() {
          return {
             languages: ['en', 'es'],
             language: 'en',
          }
       },
    }
    // HTML
    <pv-select-button v-model="$i18n.locale" :options="languages"
    class="bg-primary uppercase"></pv-select-button>

## CRUD Operations

## Main PrimeVue HTML Elements

## Firebase

