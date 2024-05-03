# BoilerDate 🥵

Full-stack dating web application focused on STEM students at Purdue University. <br /> <br />
CS 307 Project Spring 2024 - Purdue University.

## Demo


## Motivation

> ### "What if.. CS students can also date…" - Youngjun Yoo (after the breakup)

## Overview

Currently, there are many dating apps available, such as Tinder and Bumble. However, Purdue STEM students might find it challenging to find a suitable match on these platforms. BoilerDate is an alternative dating web app that specifically targets Purdue students, with a focus on those in STEM majors. This is because students in STEM are known for their academic strength, but are also often **introverted** and may have **weak social skills**. BoilerDate will be catered towards students who want to find their significant other, not only based on common dating app features but also on common academic goals and interests. 

## Tech Stacks

#### `Frontend`

- JavaScript
- React.js
- Bootstrap
- Material-UI

#### `Backend`

- Node.js
- Express.js
- Python

#### `Database`

- MongoDB Atlas

#### `APIs`

- [Twilio](https://www.twilio.com/en-us/messaging/programmable-messaging-api)
- [react-chat-engine](https://rest.chatengine.io/)

####  `Deployment`

- Backend - [Render](https://render.com/)
- Frontend - [Netlify](https://www.netlify.com/)

## Features

### Registration Page
- `User Registration` - This feature allows new users to sign up by providing essential information such as email, name, gender, and age. The registration form includes validation checks to ensure that all provided data meets the application’s requirements for format and uniqueness.
- `Email Verification` - To authenticate the user's identity and reduce spam, the system sends a verification code to the user's valid Purdue email address. Users must enter this code on the registration page to proceed with account creation.
- `Password Setup` - Users are prompted to create a password, which is then __encrypted__ for security before being stored in the database. The page also includes a password strength meter to encourage strong passwords.
- `Agreement to Terms` - Features a section where users can read and must agree to the platform’s rules and safety guidelines. This step is mandatory before the user can finalize their account setup.

![registration](/docs/images/registration.gif)


### Discover Page
 - `Dynamic Profile Cards` - Displays profile cards of potential matches. Each card includes brief information visible at a glance, such as the user's name, age, and profile picture.
 - `Integrated Filtering` - Profiles shown are influenced by the user’s preferences set on the Filter Page. Users can adjust these filters to refresh the displayed profiles.
 - `User Interaction Options` - Each profile card comes with buttons to like, dislike, or block the user. These interactions directly affect the relationship status with that profile and are updated in real time.

![discover](/docs/images/discover.gif)

### Filter Page
- `Customizable Search Criteria` - Users can define and adjust a range of filters, such as GPA, major, citizenship status, age range, interests, educational background, and more, to refine the profiles displayed on the Discover Page.
- `Preference Profiles` - All user preferences are saved and can be edited anytime. Changes are immediately reflected in the user interactions on the Discover Page.
- `User Interface for Easy Navigation` - The filter settings are organized into categories with an intuitive interface, allowing for easy toggling between different preferences.

![discover](/docs/images/filter.gif)

### Profile Page
- `Personal Profile Overview` - Users can view and scroll through all details of their profile, including biographical information, interests, and uploaded photos.
- `Profile Customization` - Provides the ability to edit various profile components such as adding or removing interests, updating biographical data, and managing photo uploads.
- `Tag Management` - Users can add or modify custom tags that describe professional skills or personal attributes, enhancing the match accuracy with other users.

![discover](/docs/images/profile.gif)

### Relationship Page
- `Relationship Categories` - This page organizes and displays different categories of user relationships including 'Liked', 'Liked by Me', 'Matches', and 'Blocked Users'.
- `Manage Matches and Interactions` - Users have the ability to revisit their likes, matches, or blocked profiles and can change their status, for example, unmatching users.

![discover](/docs/images/relationship.gif)

### Settings Page
- `Account Management` - Users can update their email, password, and other account details. There is also an option to delete the account, which requires confirmation to prevent accidental deletions.
- `Notification Preferences` - Allows users to customize which actions generate notifications, such as receiving a like or a message, and choose the medium through which they receive these notifications (e.g., email, SMS).
- `Privacy Controls` - Provides settings to control which parts of their profile are visible to other users, helping manage personal data exposure on the platform.

![discover](/docs/images/settings.gif)

### Chat Page
- `Messaging System` - Facilitates real-time messaging between matched users, complete with timestamps and indicators for sent/read status.
- `Conversation Dashboard` - Displays all active conversations, each clearly separated to ensure users can easily switch between different chats without confusion.
- `Automatic Chat Deletion` - If users unmatch, the chat history with that user is automatically deleted from the system. This feature ensures privacy and cleanliness of the user interface, preventing clutter from past interactions that are no longer relevant.

![discover](/docs/images/chat.gif)

## Credits
- Youngjun Yoo (Scrum Master)
- Chaewon Lee 
- Jeongbin Lee
- Hosung Ryu
  
