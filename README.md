# FastLog

### Overview
This project is a secure data sharing website that allows users to enter their username and authenticate with a secret passkey. Once authenticated, users can upload text, links, images, and files, and access their content on other devices using the same passkey.


### Features
- **Secure Login**: Users can securely log in with their username and their passkey.
- **Multi-Device Access**: Users can upload content and access it on any device using the same passkey.
- **Content Upload**: Supports uploading text, links, images, and files.
- **Secure Data Storage**: Utilizes MongoDB to securely store user data and text and Cloudinary for files.
- **Authentication**: Employs JWT for robust authentication.
- **State Management**: Uses Redux to manage application state and ensure data integrity and user privacy.
- **Dockerized Deployment**: The application is containerized using Docker for easy setup and deployment.

### Technologies Used

- **ReactJS**: For the frontend
- **TailwindCSS**: For styling purposes
- **NodeJS and ExpressJS**: For the backend
- **MongoDB**: For secure data storage.
- **JWT**: For user authentication.
- **Redux**: For state management.
- **Docker**: For containerizing the application.
  

### Installation

**Clone the Repository**:

```sh
git clone https://github.com/shivanshar97/fastlog.git
```

Using npm / yarn / bun:
```sh 
cd frontend
npm i && npm run dev

cd backend
npm i && npm run start
```

Using Docker:

Set the necessary environment variables and then run
```sh 
docker compose up
```
### Contribution Guidelines

If you wish to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes.
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature-branch`).
- Open a pull request.