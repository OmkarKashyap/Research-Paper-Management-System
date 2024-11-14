# Research Paper Management System

A system for managing research papers, including features like paper submission, review, and retrieval. This project includes a frontend and backend, each with its own setup and installation steps.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (for frontend setup)
- [Python](https://www.python.org/) (for backend setup)
- [pip](https://pip.pypa.io/en/stable/) (for Python dependencies)

## Setup Instructions

### Frontend

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

    This will start the frontend server, and you can access the app by going to `http://localhost:3000` in your browser.

### Backend

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment (if using `venv`):

    ```bash
    python3 -m venv venv
    ```

3.  Activate the virtual environment:

    - **On Windows**:
      ```bash
      venv\\Scripts\\activate
      ```
    - **On macOS/Linux**:
      ```bash
      source venv/bin/activate
      ```

4.  Install the required Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5.  Run the backend server:

    ```bash
    python app.py
    ```

### Environment Variables

You may need to configure certain environment variables for your backend, such as database credentials or API keys. Add these variables in a `.env` file in the `backend` directory. Example:

```bash
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```
