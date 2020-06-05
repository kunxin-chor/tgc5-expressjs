# Q6 - Adding in Mongo

## WALKTHROUGH


### Step 1 - Install `mongodb` package
Be sure to install the `mongodb` package

```
yarn add mongodb
```

### Step 2 - Incorporate mongoUtil.js

Add your mongo URL to `mongoUtil.js`

use `require` to include `mongoUtil`

Only create the routes after you have connected to the DB.

## Questions

Create a CRUD for adding a book.

`GET /books.` - display all books in the system

`GET /book/add` - display the form to let the user add a book. A book has ISBN, title, author and genres. A book can have many genres.

`POST /book/add` - process the form and add the book to the database

`GET /book/update/:id` - display the form to let allow the user to update a book

`POST /book/update/:id` - update the book

`GET /book/delete/:id` - confirm if to delete a book with the provided id

`POST /book/delete/:id` - delete the book



