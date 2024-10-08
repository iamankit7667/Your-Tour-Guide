# Your Tour Guide

Your Tour Guide is a comprehensive hub for family travel packages, offering a wide variety of options for both domestic and international tours. Our mission is to deliver a seamless and delightful travel experience, meticulously crafted by our seasoned travel experts to cater to all family needs.

## Features

- **Diverse Travel Packages**: Explore a range of packages tailored for family-friendly adventures.
- **Personalized Itineraries**: Enjoy customized travel plans that cater to your family's interests and needs.
- **User-Friendly Interface**: Navigate effortlessly through our website to find the perfect travel experience.

## Website Links

- **Frontend URL**: [https://frontend-your-tour-guide.onrender.com](https://frontend-your-tour-guide.onrender.com)
- **Backend URL**: [https://backend-your-tour-guide.onrender.com](https://backend-your-tour-guide.onrender.com)

## Screenshots

![HomePage](https://github.com/iamankit7667/Your-Tour-Guide/blob/main/client/public/YourTourGuide-HomePage.png)

## Getting Started

To get a local copy of this project up and running, follow these simple steps:

### Prerequisites

- Node.js and npm installed on your machine
- Docker (for backend deployment)
- A code editor of your choice (e.g., Visual Studio Code)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iamankit7667/Your-Tour-Guide.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Your-Tour-Guide
   ```
3. **Install frontend dependencies**:
   ```bash
   cd client
   npm install
   ```
4. **Install backend dependencies**:
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

1. **Run the frontend**:
   ```bash
   cd client
   npm start
   ```
2. **Run the backend** (if not using Docker):
   ```bash
   cd ../server
   npm start
   ```

### Docker Deployment

If you are using Docker for backend deployment, ensure you have Docker installed and run:
```bash
docker build -t your-tour-guide-backend .
docker run -p 5000:5000 your-tour-guide-backend
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License.
