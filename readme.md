
###### Assignment -3
### Library Management API with Express, TypeScript & MongoDB

## 🚀 Features
- 📘 CRUD operations for books
- 🔒 unique ISBN 
- 📥 Borrow books with quantity tracking
- 🔁 Automatically update book availability and stock

## 🛠 Technology 
- Node.js
- Express.js
- MongoDB 
- Mongooes
- TypeScript
- MVC pattern 

## 📚 API Endpoints

#### GET `/api/books`
-Get All Books

##### Filter sorting and limit Api

`GET /api/books?filter=FANTASY&sortBy=createAt&sort=asc&limit=10`

- filter  -- filter by genre
- sortBy -- asc or desc
- limit - default 10

#### GET `/api/books/:bookId`
- Get Book by 
- Use book _Id to retrive specific book

##### Response

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```

#### POST `/api/books`
- Create A new Book

##### Request
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

##### Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

##### Update Book api

#### PUT `/api/books/:bookId`

##### Request

```json
{
  "copies": 50
}
```

##### Response

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

##### Delete Book api

#### DELETE `/api/books/:bookId`


##### Response
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

#### Borrow Book 

#### POST `/api/books/:bookId`

- Verify the book has enough available copies.
- Deduct the requested quantity from the book’s copies.
- If copies become 0, update available to false.


##### Response

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```

##### Response

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

#### Borrowed Books Summary 

#### GET `/api/borrow`

- Aggregation pipeline will retunt book title and isbn 
- Group borrow records by book
- sum total quantity borrowed per book
- Return book info and total borrowed quantity


##### Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build


🙌 Author
Akmal Hossain — Trying to be a Full-stack Developer,  from Khulna, Bangladesh