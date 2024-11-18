# Zigment Assignment 

## Installation 
To install the dependencies run the following cmd 
```sh
npm install
```

To start the server run the following cmd 
```sh
npm run start
```

## Run Tests
The following command is to run tests. 
```sh
npm run tests
```

## ENV EXAMPLE 
Put the following env variables in your .env file.
```sh
MONGO_UR=<connection_string>
```

## API Docs
  - ### User Preference Endpoint

    **POST**: /api/preferences <i>replaced localhost with the hosted URL</i>
    </br></br>creates new user preferences

    ```sh
    Endpoint: localhost:3000/api/preferences
    Body(JSON):
    {
      "userId": "user123",
      "email": "user@example.com",
      "preferences": {
        "marketing": true,
        "newsletter": false,
        "updates": true,
        "frequency": "weekly",
        "channels": {
          "email": true,
          "sms": false,
          "push": true
        }
    
      },
      "timezone": "America/New_York"
    }

    Response:
      {
        "userId": "userabc123",
        "email": "user@example.com",
        "preferences": {
            "marketing": true,
            "newsletter": false,
            "updates": true,
            "frequency": "weekly",
            "channels": {
                "email": true,
                "sms": false,
                "push": true
            }
        },
        "timezone": "America/New_York",
        "_id": "673b9b0eb3a76b17da76b637",
        "lastUpdated": "2024-11-18T19:52:46.456Z",
        "createdAt": "2024-11-18T19:52:46.457Z",
        "__v": 0
      }
    ```
    

  **Get**: /api/preferences/:userId
  </br></br> Finds user preference from the database and returns it. 

  ```sh
    Endpoint: localhost:3000/api/preferences/user123
    response:
      {
          "_id": "673aad64b246d03d17f6b762",
          "userId": "user123",
          "email": "user@user.com",
          "preferences": {
              "marketing": true,
              "newsletter": false,
              "updates": true,
              "frequency": "weekly",
              "channels": {
                  "email": true,
                  "sms": false,
                  "push": true
              }
          },
          "timezone": "America/New_York",
          "lastUpdated": "2024-11-18T13:39:34.054Z",
          "createdAt": "2024-11-18T02:58:44.958Z",
          "__v": 0
      }
  ```

  **PATCH**: /api/preferences/:userId
  </br></br> Find user with userId provided in the params and updates it with the data provied

  ```sh
    Endpoint: localhost:3000/api/preferences/user123

    Body:
    {
      "userId": "user123",
      "email": "user@user.com",
      "preferences": {
        "marketing": true,
        "newsletter": false,
        "updates": true,
        "frequency": "weekly",
        "channels": {
          "email": true,
          "sms": false,
          "push": true
        }
    
      },
      "timezone": "America/New_York"
    }

    Response: {
          "_id": "673aad64b246d03d17f6b762",
          "userId": "user123",
          "email": "user@user.com",
          "preferences": {
              "marketing": true,
              "newsletter": false,
              "updates": true,
              "frequency": "weekly",
              "channels": {
                  "email": true,
                  "sms": false,
                  "push": true
              }
          },
          "timezone": "America/New_York",
          "lastUpdated": "2024-11-18T13:39:34.054Z",
          "createdAt": "2024-11-18T02:58:44.958Z",
          "__v": 0
    }
  ```

  **DELETE**: /api/preferences/userId
  </br></br> Finds the user with provided userId in the params and removes it from the database

  ```sh
    Endpoint: localhost:3000/api/preferences/user123
  ```

- NotificationLog Endpoints:
    **POST**: api/notifications/send
    </br></br> Runs a Simulation of sending the user a notification.

    ```sh
    Endpoint: localhost:3000/api/notifications/send

    Body: {
      "userId": "user123",
      "type": "marketing",
      "channel": "email",
      "content": {
        "subject": "Special Offer 1-00000",
        "body": "Check out our latest deals!"
      }
    }
    ```

    **GET**: /api/notifications/:userId/logs
    </br></br> Gets all notifications of the userId provided.

    ```sh
    Endpoint: localhost:3000/api/notifications/user123/logs
    ```

    **GET**: /api/notifications/stats
    </br></br> Gets all the stats of how many message were sent and failed.
    ```sh
    Endpoint: localhost:3000/api/notifications/stats
    Response: {
        "total": 13,
        "sent": 9,
        "failed": 4
    }
    ```
  
  
