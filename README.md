# Blog Backend

A RESTful blog API built with Node.js and Express. Authors can register, log in, and manage their articles through JWT-protected routes, with support for image uploads via Multer.

## Features

- Author registration and login with JWT authentication
- Full CRUD for articles (create, read, update, delete)
- Fetch articles by ID or by author
- Image uploads for articles and author profiles
- Protected routes using Bearer token middleware

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **File Uploads:** Multer

## API Endpoints

> Base paths (e.g. `/article`, `/author`) depend on how the routers are mounted in your main app file. Adjust accordingly.

### Authors

| Method | Endpoint            | Auth | Description                       |
| ------ | ------------------- | ---- | --------------------------------- |
| POST   | `/author/register`  | No   | Register a new author (with image)|
| POST   | `/author/login`     | No   | Log in and receive a JWT          |
| GET    | `/author/getById/:id` | Yes | Get an author by ID              |
| DELETE | `/author/delete/:id`  | Yes | Delete an author                 |

### Articles

| Method | Endpoint                    | Auth | Description                   |
| ------ | --------------------------- | ---- | ----------------------------- |
| POST   | `/article/Add`              | Yes  | Create an article (with image)|
| GET    | `/article/getAll`           | No   | Get all articles              |
| GET    | `/article/getById/:id`      | No   | Get an article by ID          |
| GET    | `/article/getByIdAuthor/:id`| No   | Get articles by author ID     |
| PUT    | `/article/update/:id`       | Yes  | Update an article             |
| DELETE | `/article/delete/:id`       | Yes  | Delete an article             |

## Authentication & Authorization

Protected routes require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

Requests with a missing, invalid, or expired token receive a `401 Unauthorized` response.

## File Uploads

Images are handled with Multer and saved to the `/Uploads` directory. Send them as `multipart/form-data` using the `image` field.

## Project Structure

```
├── config/          # Database connection (MongoDB via Mongoose)
├── controllers/     # Route handlers (article, author)
├── middelwares/     # Auth and upload middleware
├── models/          # Database models
├── routes/          # Express routers (article, author)
├── Uploads/         # Uploaded images
├── .gitignore       # Git ignore rules
├── app.js           # App entry point
├── example.json     # Postman collection for testing the API
└── package.json     # Dependencies and scripts
```

## License

This project is licensed under the [MIT License](LICENSE).
