# StatusPage Backend
StatusPage Backend is a backend service for a real time status update. 
## Installation
To install UnstopBackend, follow these steps:
1. Clone the repository:
   ```bash
   https://github.com/sum1275/StatusPage-Backend.git

## Database and Server Configuration for Development Environment

To set up the project in your local environment, configure the `.env` file as follows:

1. Create a file named `.env` in the root directory of the project.
2. Add the following content to the `.env` file:

   ```plaintext
   # Environment variables for development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/Systemstatus

3. In Terminal type npm run dev to start the backend.
4. Open MongoDB Compass and click on "New Connection."
5. Enter the connection string `MONGODB_URI=mongodb://localhost:27017/Systemstatus` and click "Connect."

## API Endpoints
- **Open Issues Status**:
  - **Method**: `GET`
  - **Endpoint**: `https://statuspage-backend.onrender.com/api/status/`
   - **Response Sample**:
    ```json
       {  "success": true,
    "message": "Fetched incomplete issues successfully",
  "data": {
    "issues": [
      {
        "_id": "3f693111",
        "application": "AWS ELB",
        "title": "Load Balancer Configuration",
        "completed": false,
        "statuses": [
          {
            "subtitle": "Major outage",
            "description": "Load balancer health checks failing for EU region. Traffic routing affected.",
            "timestamp": "2024-12-16T05:05:34.019Z"
          },
          {
            "subtitle": "Partial outage",
            "description": "load load test",
            "timestamp": "2024-12-18T18:41:21.483Z"
          }
        ],
        "userId": "cloud_ops_3",
        "timestamp": "2024-12-18T18:41:21.484Z",
        "__v": 0
      },
     
      {
        "_id": "e43d4f20",
        "application": "MobileApp",
        "title": "Database Connection Issue",
        "completed": false,
        "statuses": [
          {
            "subtitle": "Operational",
            "description": "Intermittent database connectivity observed in the APAC region. Impacting user transactions.",
            "timestamp": "2024-12-17T01:28:22.783Z"
          }
        ],
        "userId": "test",
        "timestamp": "2024-12-17T01:28:22.815Z",
        "__v": 0
      }
    ],
    "count": 4
  }
    }

    ```

- **All Issues**:
- **Method**: `GET`
- **Endpoint**: `https://statuspage-backend.onrender.com/api/status/allIssues`
 - **Response Sample**:
    ```json
       { "success": true,
   "message": "Fetched all issues successfully",
   "data": {
    "issues": [
      
      
      {
        "_id": "62d0fd0e",
        "application": "EnterpriseApp",
        "title": "Database Connection Issue",
        "completed": false,
        "statuses": [
          {
            "subtitle": "Degraded performance",
            "description": "Intermittent database connectivity observed in the APAC region. Impacting user transactions",
            "timestamp": "2024-12-17T04:06:44.401Z"
          }
        ],
        "userId": "test",
        "timestamp": "2024-12-17T04:06:44.405Z",
        "__v": 0
      },
      {
        "_id": "2ff9d926",
        "application": "GamingApp",
        "title": "Leaderboard not updating",
        "completed": false,
        "statuses": [
          {
            "subtitle": "Major outage",
            "description": "Player scores are not reflected in the leaderboard in real-time",
            "timestamp": "2024-12-17T03:13:26.313Z"
          }
        ],
        "userId": "test",
        "timestamp": "2024-12-17T03:13:26.316Z",
        "__v": 0
      },
     
      
      {
        "_id": "43f92479",
        "application": "EnterpriseApp",
        "title": "Login page UI enhancement",
        "completed": true,
        "statuses": [
          {
            "subtitle": "Major outage",
            "description": "Update the UI for the login page to match the new design guidelines.",
            "timestamp": "2024-12-17T02:36:15.721Z"
          }
        ],
        "userId": "test",
        "timestamp": "2024-12-17T02:36:15.723Z",
        "__v": 0
      },
      {
        "_id": "2212bff1",
        "application": "EnterpriseApp",
        "title": "Application is down",
        "completed": true,
        "statuses": [
          {
            "subtitle": "Partial outage",
            "description": "The application is experiencing a major outage.",
            "timestamp": "2024-12-17T01:33:13.288Z"
          }
        ],
        "userId": "test",
        "timestamp": "2024-12-17T01:33:13.291Z",
        "__v": 0
      },
    
    ],
    "count": 9
     }
       }
    ```

- **Add an Issue**:
-  - **Method**: `POST`
  - **Endpoint**: `http://localhost:5000/api/status/issues`
  - **Request Body**:
    ```json form-data
    
    { "title": "Bug in login functionality",
  "description": "The login page throws an error when submitting the form with valid credentials.",
  "application": "Web Portal",
  "subtitle": "Major outage",
  "completed": false,
  "userId": "user12345"
      }
      ```   
 
 - **Response Sample**:
    ```json
      {  "success": true,
  "message": "Issue added successfully",
  "data": {
    "_id": "be781077",
    "application": "Web Portal",
    "title": "Bug in login functionality",
    "completed": false,
    "statuses": [
      {
        "subtitle": "Major outage",
        "description": "The login page throws an error when submitting the form with valid credentials.",
        "timestamp": "2024-12-18T21:55:21.654Z"
      }
    ],
    "userId": "user12345",
    "timestamp": "2024-12-18T21:55:21.663Z",
    "__v": 0
         }
        }
          ```    
 
## Contributing
- **Add Status**:
  - **Method**: `POST`
  - **Endpoint**: `http://localhost:5000/api/status/issues/:issueId`
  - **Request Body**:
    ```json form-data
   { "subtitle": "Degraded performance",
     "description": "The application is running slower than expected."
}

    ```

- **Response Body**:
    ```json form-data
{
  "success": true,
  "message": "Status added successfully",
  "data": {
    "_id": "be781077",
    "application": "Web Portal",
    "title": "Bug in login functionality",
    "completed": false,
    "statuses": [
      {
        "subtitle": "Major outage",
        "description": "The login page throws an error when submitting the form with valid credentials.",
        "timestamp": "2024-12-18T21:55:21.654Z"
      },
      {
        "subtitle": "Degraded performance",
        "description": "The application is running slower than expected.",
        "timestamp": "2024-12-18T22:00:06.971Z"
      }
    ],
    "userId": "user12345",
    "timestamp": "2024-12-18T22:00:06.973Z",
    "__v": 0
  }
}

    ```    
- **Delete Issue**:
  - **Method**: `DELETE`
  - **Endpoint**: `http://localhost:5000/api/status/issue/:issueId`
  - **Response Body**:
    ```json form-data
  {
  "success": true,
  "message": "Issue deleted successfully",
  "data": {
    "_id": "be781077",
    "application": "Web Portal",
    "title": "Bug in login functionality",
    "completed": false,
    "statuses": [
      {
        "subtitle": "Major outage",
        "description": "The login page throws an error when submitting the form with valid credentials.",
        "timestamp": "2024-12-18T21:55:21.654Z"
      },
      {
        "subtitle": "Degraded performance",
        "description": "The application is running slower than expected.",
        "timestamp": "2024-12-18T22:00:06.971Z"
      }
    ],
    "userId": "user12345",
    "timestamp": "2024-12-18T22:00:06.973Z",
    "__v": 0
  }
}
    ```
    
Contributions to Status Backend are welcome. 

