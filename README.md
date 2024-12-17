# Zonk
Zonk (or Farkle) - a dice game. Its origin as a folk game is not known, but the game dates back at least to the mid-1980s. Since 1996, it has been commercially sold under the Pocket Farkel brand by Legendary Games Inc. While the basic rules are well-established, there is a wide range of variations in scoring and gameplay.

## Game Description
Before starting the game, players agree on a target, i.e., the number of points needed to win (usually between 2,000 and 5,000). Zonk uses 6 dice, rolled one at a time by players. All dice are rolled together to create a random combination of numbers. The combination on the table is then compared with the existing game combinations (see below). If the dice combination on the table does not match any game combination, the player receives 0 points, and the game continues. If at least one die is a combination, the player can keep it (one or more from 1 to 5) and reroll all others (5 dice after keeping just 1). If after rerolling the remaining dice there are no combinations, the player receives 0 points, even though they would have gained something originally. Otherwise, there is a chance to score more points after rerolling than originally. The newly rolled combinations do not add to the original dice to create further combinations. If all rolled dice are part of a combination, the player can roll them again, and the newly rolled combination points are added to the original combination points. The player wins who first reaches the target score.

### Combinations:
- 1-One. A die showing a 1. Score: 100 points.
- 5-Five. A die showing a 5. Score: 50 points.
- 111-Triple ones. Three dice showing a 1. Score: 1,000 points.
- 222, 333- Triple number. Three dice showing any identical number, except 1. Score: number x 100 (e.g., 333: 3 x 100 = 300).
- 222222, 333333- Double triple number. All dice showing any identical number, except 1. Score: number x 200 (e.g., 333333: 3 x 200 = 600).
- 111111- Double triple ones. All dice showing 1. Score: 2,000 points.
- 123456-One to six. Dice showing all possible numbers from 1 to 6. Score: 1,500 points.
- 23456-Two to six. Dice showing numbers from 2 to 6. Score: 750 points.
- 12345-One to five. Dice showing numbers from 1 to 5. Score: 500 points. Order of the dice on the table is not considered.

## Application Description
The application allows the above-described game to be played. To start the game, Java must be installed, and the (.jar) desktop application file must be downloaded. Then, by using the IP address of a known server, players connect to it and log in with their username to join a room. Once the game starts, they participate.

## Application Architecture

![image](https://github.com/user-attachments/assets/648304aa-18db-482c-a505-a6741422fd63)

### Desktop Application:
Users download the desktop application and run it with Java installed.
Developed using JavaFx and the Chromium Embedded Framework (CEF). CEF is used to create a custom browser inside the JavaFx application.

### Frontend Web Server:

Upon launching, the application connects to a remote frontend server, which sends the user a static login webpage using CEF, written in HTML, CSS, and JS.
The server is developed using Node.js and TypeScript, then compiled to JavaScript for browser compatibility.

### Backend Web Server:
By entering the IP address, the user provides the IP address of the remote socket server, which is then forwarded to the user’s application. If the connection is successful, the server processes the sent data, returns processed data, and the application forwards it to the frontend. The player logs in this way.
The backend server is developed in Java and uses socket connections.

## Functionality
- Login: Users can log into any server with their username upon opening the application.
- Waiting Room: Before starting the game, players group in waiting rooms; if one does not start the game, it remains paused.
- Start Game: The game can only be started from a waiting room after setting the target score.
- Game:
  - Access to the game’s progression as described above.
  - Current Game Status: Lists the number of players, scores, table status, and who is currently playing.
  - Rolling Dice: A player can roll the dice when it’s their turn by clicking the “Roll” button.
  - Confirm Turn: If satisfied with the rolled combinations, they can confirm the end of their turn, and the points for the combination are added.
  - Reroll Dice: If not satisfied but has at least one kept die, they can reroll the other dice to get a new combination or receive zero points.
  - Winning: When a player reaches the target score, a message is displayed for the winner, and all players are moved back to the waiting room.
- Language Selection.
- Help with Combinations.

## Storage Structure
The storage contains three folders for three different applications:

- application - Folder for the desktop application for users.
- client - Folder for the frontend server:
  - assets - Folder for project visual elements: images, styles.
  - build - Folder for compiled JavaScript code.
  - dev - Folder for TypeScript development:
    - connection - Folder for connection module.
    - game - Folder for the game module.
    - language - Folder for language settings module.
    - lobby - Folder for waiting room module.
    - logger - Folder for logging module.
    - login - Folder for login module.
    - notifications - Folder for notifications module.
    - tasks - Folder for creating socket server tasks.
    - enums - Folder for enumerations storage.
    - utils - Folder for helper functions storage.
  - dist - Folder for the compressed JavaScript code.
  - pages - Folder for static HTML pages:
    - game - Folder for game pages.
    - lobby - Folder for waiting room pages.
- server - Folder for the backend server:
  - java - Main project folder:
    - controllers/socket - Folder for application controllers.
    - commands - Folder for command classes.
    - sockets - Folder for classes to run the socket server.
    - entities - Folder for object/entity classes used in the game.
    - services - Folder for services handling commands.
    - enums - Folder for enumerations storage.
    - exceptions - Folder for exceptions storage.
  - test - Folder for unit tests storage.

## Protocol Design

For communication between the client (Desktop Application) and the Server (Java Application), Java sockets are used, utilizing the TCP/UDP Internet protocol for connection. Messages are always sent in JSON format and contain an ID number, task name, status, and data.

- **ID Number**: A random number from 10000 to 99999 not used by any other messages.
- **Status**: The current task status, which can be one of the following:
  - `UNEXECUTED` (not yet processed)
  - `SUCCESS` (processed successfully)
  - `ERROR` (failed during processing)
- **Data**: Various data packages specified for specific tasks.

Example:
```json
{
  "taskID": "12345",
  "commandName": "api/login",
  "status": "UNEXECUTED",
  "data": { ... }
}
```

If an error occurs during the application run, the task is marked as failed (ERROR), and the data sent is the name of the error that caused the failure. This error is then interpreted on the frontend and announced to the user in a user-friendly format.
Data packages are also JSON Objects. Each command requires an individual data package.

### Protocols for Data Packets for Specific Commands:
1. **Login** - User login.
   - **Requested Data**: Player's username, room name.
     ```json
     {
       "name": "BestPlayer",
       "room": "Lobby"
     }
     ```
   - **Returned Data**: Player's ID.
     ```json
     { "data": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```

2. **GetPlayers** - Retrieve a list of players.
   - **Requested Data**: Room name.
     ```json
     { "room": "Lobby" }
     ```
   - **Returned Data**: List of users and whether the game has started.
     ```json
     {
       "data": {
         "players": [
           {
             "currentPoints": 0,
             "name": "BestPlayer",
             "totalPoints": 0,
             "sessionId": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
             "bannedDices": [0,0,0,0,0,0],
             "status": "inlobby"
           }
         ],
         "isInGame": false
       }
     }
     ```

3. **GetRoom** - Retrieve a room by player's ID.
   - **Requested Data**: Player's ID.
     ```json
     { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```
   - **Returned Data**: Room name.
     ```json
     { "data": "Lobby" }
     ```

4. **CreateGame** - Create a new game.
   - **Requested Data**: Player's ID, target score.
     ```json
     {
       "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
       "points": "2000"
     }
     ```
   - **Returned Data**: Error message or none.

5. **GetState** - Get the current state of a player's game.
   - **Requested Data**: Player's ID.
     ```json
     { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```
   - **Returned Data**: Player's score from the last roll, total points, target score, list of teammates, whether it's the player's turn, array of banned dices, array of dices on the table (if available), player status, winner (if exists).
     ```json
     {
       "data": {
         "currentPoints": 0,
         "total": 800,
         "goal": 2000,
         "players": [
           {
             "currentPoints": 0,
             "name": "BestPlayer",
             "totalPoints": 800,
             "sessionId": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
             "bannedDices": [0,0,0,0,0,0],
             "status": "ingame"
           }
         ],
         "turn": true,
         "bannedDices": [0,0,0,0,0,0],
         "dices": [4,4,4,2,4,3],
         "status": "Waiting"
       }
     }
     ```

6. **Roll** - Roll the dice.
   - **Requested Data**: Player's ID.
     ```json
     { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```
   - **Returned Data**: Error message or none.

7. **Check** - Check the player's status.
   - **Requested Data**: Player's ID.
     ```json
     { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```
   - **Returned Data**: Player's status.
     ```json
     { "data": "ingame" }
     ```

8. **SubmitRoll** - End turn.
   - **Requested Data**: Player's ID.
     ```json
     { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
     ```
   - **Returned Data**: Error message or none.

9. **Reroll** - Reroll dice.
   - **Requested Data**: Player's ID, chosen dices.
     ```json
     {
       "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
       "choosenDices": { "1": 1, "3": 5 }
     }
     ```
   - **Returned Data**: Error message or none.

10. **CheckCombination** - Verify selected combination.
    - **Requested Data**: Player's ID, chosen dices.
      ```json
      {
        "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
        "choosenDices": { "1": 1, "3": 5 }
      }
      ```
    - **Returned Data**: Whether the selected dices contain at least one combination.
      ```json
      { "data": { "result": true } }
      ```

11. **CloseGame** - End game.
    - **Requested Data**: Player's ID.
      ```json
      { "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8" }
      ```
    - **Returned Data**: Error message or none.

12. **AddPlayer** - Add a player to the game.
    - **Requested Data**: Player's ID, name of the room where the game is held.
      ```json
      {
        "id": "5ff8f76a-798c-4b8c-9fca-8d14ad5649a8",
        "room": "Lobby"
      }
      ```
    - **Returned Data**: Error message or none.




## Design of Screens
### Login Screen
![image](https://github.com/user-attachments/assets/6e365e90-6fb1-4352-b216-af747b2094d5)

### Waiting Room Screen
![image](https://github.com/user-attachments/assets/126dc5b4-0bfb-45c0-bc0f-7a692150ce53)

### Screen for Players When It's Not Their Turn
![image](https://github.com/user-attachments/assets/b869d6ea-7bb5-4d5c-9b56-4a2bbcbff495)

### Screen for Players When It's Their Turn (with active roll button)
![image](https://github.com/user-attachments/assets/44488f45-2abe-43cf-b24c-73f9e336e97a)

### Screen for Players After Rolling
![image](https://github.com/user-attachments/assets/5a3f4e44-86a9-492d-a648-410cb041f35a)

## UseCase Diagram
![image](https://github.com/user-attachments/assets/aea4f592-7870-48b1-bafe-174a0b55d2f9)

## Class diagram
![classdiagram_page-0001](https://github.com/user-attachments/assets/12a6eb72-09f2-4eb6-9d33-e05ae6c30c65)




