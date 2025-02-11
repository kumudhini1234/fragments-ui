# Fragments UI

Fragments UI is a front-end web application that interacts with the Fragments API service. It allows users to authenticate via Amazon Cognito and perform CRUD operations on text fragments.

## Features
- User authentication via Amazon Cognito
- Create, retrieve, update, and delete text fragments
- Secure API communication with JWT authentication
- Hosted locally with Parcel.js

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

## Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/fragments-ui.git
   cd fragments-ui
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Run the Application:**
   ```sh
   npm start
   ```
   The app should be accessible at `http://localhost:1234`.

## Usage
- **Login**: Authenticate using Cognito’s Hosted UI.
- **Create a Fragment**: Submit a text fragment via the UI.
- **View Fragments**: Retrieve and display stored fragments.
- **Edit/Delete Fragments**: Modify or remove existing fragments.

## Testing
To run tests and check coverage:
```sh
npm run test
npm run coverage
```
Ensure test coverage is **above 85%**.

## Deployment
For production deployment:
```sh
npm  start
```
This generates a login page where you sign up with your details

## Troubleshooting
- If authentication fails, check Cognito settings in `.env`.
- If API requests fail, verify `VITE_API_URL` is correct.

## Contributors
- **Kumudhini Reddicherla** - Developer

## License
This project is licensed under the MIT License.

