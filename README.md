# Polling System API

This is a backend API built to manage a simple polling system. Users can create questions, add options to specific questions, vote for options, and delete questions or options. Each question's options are dynamically linked for ease of voting.

### Features:

- Create questions with a dynamic number of options.
- Add options to a question.
- Vote for options.
- Delete a question (only if no votes are cast on any options).
- Delete an option (only if it has no votes).
- View a question with its options and vote counts.

---

## **Table of Contents**

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Installation Guide](#installation-guide)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Folder Structure](#folder-structure)
7. [Setup Instructions](#setup-instructions)

---

## **Tech Stack**

- **Node.js**: Backend runtime.
- **Express.js**: API framework for building RESTful services.
- **MongoDB**: Database for storing questions and options.
- **Mongoose**: ODM for MongoDB.

---

## **Features**

- **Create a Question:** Add a question to the database.
- **Add Options:** Attach options to any question.
- **Vote:** Increment the vote count of any option.
- **Delete Question:** Remove a question if no votes have been cast.
- **Delete Option:** Remove an option if it has zero votes.
- **View Question:** Retrieve a question with all its options, vote counts, and voting links.

---

## **Installation Guide**

1. Clone the repository:
   ```bash
   git clone https://github.com/rahul-g-1997/Polling-System.git
   ```
2. Navigate to the project folder:
   ```bash
   cd polling-system-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Use the `.env.sample` file as a reference.
   - Example:
     ```
     PORT=8000
     MONGO_URI=mongodb://localhost:27017/pollingSystem
     ```
5. Start the server:
   ```bash
   npm start
   ```

---

## **Environment Variables**

The application requires the following environment variables to be set:

| Variable    | Description                            | Example                                   |
| ----------- | -------------------------------------- | ----------------------------------------- |
| `PORT`      | Port on which the application will run | `8000`                                    |
| `MONGO_URI` | MongoDB connection string              | `mongodb://localhost:27017/pollingSystem` |

---

## **API Endpoints**

| Method | Endpoint                        | Description                            |
| ------ | ------------------------------- | -------------------------------------- |
| POST   | `/questions/create`             | Create a new question.                 |
| POST   | `/questions/:id/options/create` | Add options to a specific question.    |
| DELETE | `/questions/:id/delete`         | Delete a question if no votes exist.   |
| DELETE | `/options/:id/delete`           | Delete an option if it has no votes.   |
| PUT    | `/options/:id/add_vote`         | Increment the vote count of an option. |
| GET    | `/questions/:id`                | View a question with its options.      |

---

## **Folder Structure**

```plaintext
polling-system-api/
├── src/                  # Source folder containing the application logic
│   ├── controllers/      # Contains route logic
│   │   ├── questionController.js
│   │   ├── optionController.js
│   ├── models/           # Mongoose schemas and models
│   │   ├── Question.js
│   │   ├── Option.js
│   ├── db/               # Database connection files
│   │   ├── connect.js
│   ├── routes/           # Route definitions
│   │   ├── questionRoutes.js
│   │   ├── optionRoutes.js
│   ├── app.js            # Main application logic
│   └── index.js          # Entry point of the application
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Lock file for installed dependencies
├── README.md             # Project documentation
```

---

## **Setup Instructions**

1. Make sure MongoDB is installed and running locally or remotely.
2. Set up the `.env` file with your environment variables.
3. Use a REST client like Postman to test the endpoints:
   - **Base URL**: `http://localhost:8000`
   - Example:
     - To create a question:
       ```json
       POST /questions/create
       {
         "title": "What is your favorite programming language?"
       }
       ```
     - Response:
       ```json
       {
         "id": "1",
         "title": "What is your favorite programming language?"
       }
       ```


---

## **Example Response**

**GET /questions/:id**

```json
{
  "id": 1,
  "title": "Who is your favorite from the Ninjas Mentors?",
  "options": [
    {
      "id": 1,
      "text": "Aakash Tyagi",
      "votes": 100,
      "link_to_vote": "http://localhost:8000/options/1/add_vote"
    },
    {
      "id": 2,
      "text": "Parikh Jain",
      "votes": 101,
      "link_to_vote": "http://localhost:8000/options/2/add_vote"
    }
  ]
}
```

---

## **License**

This project is licensed under the MIT License.
