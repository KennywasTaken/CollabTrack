
Simple steps for set up:

// Clone the repo onto a local directory
 1. Open Terminal and change directories into a folder you want to clone this repo into
   - You can open VSCode with a folder you want to clone the repo into as well

 2. Enter in: ``` git clone https://github.com/KennywasTaken/CollabTrack.git . ```
  - If you are using VSCode, open a terminal and copy and paste the command above

// Create the .env file
 1. Create a file name '.env' and write "PORT=6767" into it
  - You can use any port number you personally want though

// Setup the database
 1. Create a file named 'Database.db'

 2. Open your terminal and run: ``` cd ./databaseSetupQueries ```

 3. Then, enter and run: ``` sqlite3 ../Database.db ```

 4. Then, enter and run ``` .read DDL.sql ```

 5. Enter and run ``` .read DML.sql ```

 6. Enter and run ``` .exit```

// Make sure you have npm setup as well as the necessary npm modules installed
 1. Open your terminal inside the projects directory and run: ```npm init -y ```
 2. Then, enter and run: ``` npm install sqlite3 dotenv express ejs nodemon body-parser ```

// Start the server
 1. In your terminal enter and run: ``` npm run dev ```
 2. Open your web browser and go to: http://localhost:6767/dashboard/1
  - If you decided to use a differnet port number replace the '6767' here with the new port number



// Current Endpoints
 - https://localhost:6767/dashboard/{user_id} 
   - Currently only 10 users so use 0-10 for user_id 
   - Used to use examples of differnt user dashboards based on their data stored in the database

 - https://localhost:6767/dashboard
   - Redirects to login page 

 - https://localhost:6767/login
   - Login page
   - Use any Username and password combination stored in the database and it will redirect to the dashabrod for that user

