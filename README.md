## Descritpion

This project has the following features so far:

* Main Page
⋅⋅* The main page shows 3 shelves for books.
⋅⋅* The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance.
⋅⋅* When the browser is refreshed, the same information is displayed on the page.

* Search Page
⋅⋅* The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page.
⋅⋅* Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
⋅⋅* When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.

* Routing
⋅⋅* The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
⋅⋅* The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.

## Application Setup

cd reactnd-project-myreads-starter && npm install

npm start

The server will listen to port 3000
