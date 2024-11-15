## 1.

Write `npm install`

## 2.

Write `npm install -g json-server@0.17.4`
and if it doesn't work: `npm install json-server@0.17.4`

## 3.

Write `ng add @angular/material` and accept all

## 4.

Write `ng g environments`

Then write on `environment.development.ts` the following:

        export const environment = {
          production: false,
          serverBasePath: 'http://localhost:3000/api/v1/'
        };

Then write on environment.ts the following:

        export const environment = {
          serverBasePath: undefined
        };

## 5.

Create folder `server` (/server)

## 6.

Inside `server`, create `db.json` (/server/db.json) and write fake API.

## 7.

Inside `server`, create `routes.json` (/server/routes.json) and write:

    {
    "/api/v1/*": "/$1"
    }


## 8.

Optional (but recommended) & Windows Only:

Inside `server`, create start.sh (/server/start.sh) and write:

    json-server --watch db.json --routes routes.json

This is just so it's copy-pasted multiple times in terminal

## 9.

In a new terminal, write `cd server` and then copy what's inside `start.sh`

What's inside `start.sh`?

    json-server --watch db.json --routes routes.json

## 10.

###### _Remember that from now on you must include each line with 'TAB' else it wouldn't import automatically, no more copy-paste_

Change `app.module.ts` to include:

1. All general components in `imports`

        imports: [
          BrowserModule,
          AppRoutingModule,
          HTTPClientModule
        ],

2. All components from Angular Material

        imports: [
          (...)
          BrowserAnimationsModule,
          MatInputModule,
          FormsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatTableModule,
          MatSortModule,
          MatIconModule,
          MatPaginatorModule,
          MatToolbarModule,
          MatCardModule
          MatGridListModule
        ],

PS. 1: All of them have a dedicated documentation web page in Angular Docs.

PS. 2: Remember: most important modules:

    a. MatButtonModule
    b. MatToolbarModule
    c. MatCardModule
    d. BrowserAnimationsModule
    e. MatTableModule (It's in Learning Center)

PS. 3: Te van a bajar puntos si pones módulos que no usas, en teoría, pero Angel no bajó por eso la anterior vez, así que talvez no te preocupes por esto.

3. Every dependency will add stuff here (i18n), but how it will do so later.

## 11.

Remember notations in here:

      Bounded Context = Folder
      Folder = Organized in Components, Model, Services (and Pages)

About naming a Bounded Context: It's normally mentioned in the exam statement, if not then put the name of the most important table in db.json that has a service in here (Students, Courses, etc.).

Remember, there will be a 'shared' and/or 'public' bounded context likely.

## 12.

Create entities (based on what was written in db.json)

1. Generate it

        ng g cl [bounded-context-name]/model/[service-name+".entity"]

2. You will only change what's inside 'export class':

        1. Attributes, the same that are inside db.json must be in here.
        2. Constructor, make sure that it initializes all attributes, else this entity will not work.

## 13.

Create a base service to simplify the creation of all the others.

        ng g s shared/services/base

Following such, write what's next:

        Template datatype, add to name
          export class BaseService<T> {
        Attributes, add basePath (using environments)
          baseUrl: string = '${environment.serverBasePath}';
          resourceEndpoint: string = 'object';
        Function, encapsulate both string together to use repeatedly
          private resourcePath() {
            return '${this.basePath}${this.resourceEndpoint}';
          }
        Requirement, write the following function
          httpOptions = {
            headers: new HttpHeaders({
              'Content-type': 'application/json'
            })
          }
        Constructor, include the following parameter
          private http: HTTPClient
        Good Practice, add a handleError function
          handleError(error: HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              console.log('an error ocurred ${error.error.message}');
            } else {
              console.log('Backend returned code ${error.status}, body was ${error}');
            }
            return throwError( () => new Error('Something happened with request. Please try again.'));
        Functions, using 'http.get', or 'http.post', 'http.delete'
          // HTTP POST
          create(item: any): Observable<T> {
            return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
              .pipe(retry(2), catchError(this.handleError));
          }
          // HTTP DELETE
          delete(id: any) {
            return this.http.delete('${this.resourcePath()}/${id}', this.httpOptions)
              .pipe(retry(2), catchError(this.handleError));
          }
          // HTTP Update
          update(id: any, item: any) {
            return this.http.put<T>('${this.resourcePath()}/${id}', JSON.stringify(item), this.httpOptions)
              .pipe(retry(2), catchError(this.handleError));
          }
          // HTTP Get (General)
          getAll() {
            return this.http.get<T>(this.resourcePath(), this.httpOptions)
              .pipe(retry(2), catchError(this.handleError));
          }

Create Children Services (based on what was written in db.json)

1. Generate it

        ng g s [bounded-context-name]/services/[service-name+"api.service"]

2. Write this:

        1. Child declaration, to use what's inside the base service
          export class StudentService extends BaseService<Student> {
        2. Constructor, write the following, even if there was a constructor already in base service
          constructor(http: httpClient) {
            super(http);
            this.resourceEndpoint = 'students';
          }
        3. Functions (optional), write particular GETs if desired
          getByName(name: any) {
            return this.http.get<T>('${this.resourcePath()}?name=${name}', this.httpOptions)
              .pipe(retry(2), catchError(this.handleError));
          }

3. Make sure to include each service inside 'providers' in `app.module.ts`.

        providers: [
          (...),
          FirstNameAPIService,
          SecondNameAPIService,
          ThirdNameAPIService
        ],

## 14.

Think of the organization wanted (really important):

1. Is there any two pages which don't share anything at all and a group that does?

You should add a RouterView in `app.component.html` and there will also be another RouterView inside one of the base components where everything shared is accompanying.

AKA Indented RouterView (hardest one by far, not going to appear in the exam, hopefully)

2. All pages share something

You should add a RouterView in `app.component.html` and write the shared part in there too.

3. No pages share anything

You should add a RouterView in `app.component.html`.

## 15.

Create the routes by writing in `app.routing.module.ts` the following (components must first be created, not implemented yet but generated):

1. Change inside `const routes`

        const routes: Routes = [
          { path: '/home', component: HomeComponent }
          { path: '/about', component: AboutComponent }
          { path: '', redirectTo: '/home', pathMatch: 'full' }
          { path: '**', component: PageNotFoundComponent }
        ];

## 16.

Create components from the most indented RouterView first.

      ng g c [bounded-context]/pages/[name]

Pages: Will be inside RouterView

Components: To be used by a page or father component.

THEREFORE, always inside pages.

Now, write the following in `[name].component.ts`:

    Child declaration, include that it's a child of OnInit (that is actually a constructor with a different name), it's optional but could be done in any of them (for page-not-found, it's a good practice)
      export class NameComponent implements OnInit {
    Constructor, do whatever you want in this part, depending on your attributes, but the values that store db.json objects, must be initialized in here, also attributes that store content from other components must be initialized in here.
      constructor() {
        this.invalidUrl = '';
      }
    ngOnInit, write the following inside and, after initialization, everything that is obtained from db.json or other components are assigned here.
      ngOnInit(): void {
        this.invalidUrl = this.route.snapshot.url[0].path;
        throw new Error('Method not implemented');
      }
    Functions, write everything that will be on (click)
      changeState() {
      }
    Parameters in constructor for router change, to change router with events in HTML, write this obligatorily first
      constructor(private route: ActivatedRoute, private router: Router) {
    Functions of router change, for router change by events in HTML write the following functions inside of functions
      onNavigateHome() {
        this.router.navigate(['home']).then();
      }

## 16. (2)

Good Practice: Remember to create a not-found page (this will be required in the exam).

      ng g c public/pages/page-not-found

The ideal name, according to class, is 'page-not-found'

## 16. (3)

###### You should really consider learning this one from memory and practice instead of theory

Here are the following common HTML elements in Angular

1. Mat-Toolbar (mat-toolbar)

        <mat-toolbar color="primary">

  1. Mat-Spacer in CSS

         .mat-spacer {
          flex: 1 1 auto;
         }
  2. Mat-Spacer

           <div class="mat-spacer"></div>
  3. Buttons for Router-Links

           options = [
             { path: 'home', title: 'Home' },
             { path: 'about', title: 'About' }
           ]
           // what's inside path can't be written as '/home', it will show an error in console and it will literally tell remove the "/"s
  4. Buttons for Router-Links

           <a mat-button *ngFor="let option of options" [routerLink]="option.path">{{ option.title }}</a>

2. Router-Outlet AKA RouterView for Angular (router-outlet)

        <router-outlet/>

## 17.

Documentation must include

1. Summary
2. Features

  1. Material
  2. Json Server
  3. CRUD operations
  4. In-app navigation

3. Dependencies

  1. Angular Material
  2. Angular Reactive
  3. JSON Server
  4. HttpClient
  5. Reactive Forms
  6. About Angular Framework with a single (#) (to put before pre-generate documentation)

## 18.

Done, but I haven't shown how to do the HTML part good, I think still that it's better that this is learned by practice.

## From exam:

1. You must know how to create a hero image in Angular.
2. Incluir una página "NOT FOUND" en caso se ponga un URL inexistente.
3. Redirección a home debe ser posible.
4. Te va a decir los bounded contexts si o si en el examen.
5. Utilizar @angular/router
6. Talvez no venga i18n
7. Por si acaso, tomando en cuenta que en un salón vino en la PC1, conocer como hacer un Search Bar, aunque no creo
