# Tracker
Demo Link: https://trackr-kaigao.firebaseapp.com/login 


This project is used to track devices' inventory, manage 3 different levels of users.

Client needs: The Mobile Application Design & Development program wants keep track of who currently has which devices in their possession so students are able to borrow (sign out) devices overnight from program TAs or professors. TAs or professors have different authorities to track, update devices info & status and manage users.

## My role in this project
• Acted as Team Leader developed native Android and iOS app installed on every device which allows students to borrow and return devices via taking a selfie (facial recognition required) and scanning a device QR code 
• Independently developed dashboard website to track, manage devices & manage 3 different levels of users.

1. Applied Angular 5, TypeScript, Bootstrap, jQuery for the front-end dashboard website. Angular routing for URL changes. Pipe for filtering devices. Angular guards to manage different views and permissions for different users.
2. Applied RxJS library for reactive programming using observables to deal with server response asynchronously. 
3. Firebase as the back-end to save all the inventory information shared by both the website and the mobile apps. 
4. Implemented Firebase authentication using email and password for registered users’ login management. 
5. Applied Angular Google Map - agm API to track the current device location
6. Used Angular2-qrcode to generate QR code on the website and native Face Detection APIs for Facial recognition
7. Used Git to manage and maintain the project

## Website Features
1. A log-in is required for all features. Entering a valid username and password for the view and other operations. Valid means that the username exists in the Firebase database.
2. View basic table of data about the phones including device name, operating system, device model number, operating system version, sign out status, signed out by WHO, etc.
3. Ability to filter the view table of data.
4. Ability for Teaching Assistants(TAs) and Professors to locate any device by seeing it on a map.
5. Display a QR code for a device only for Professors
6. TAs can have additional access to the add and edit screens. One screen for editing all the information about the devices (NOT sign out status) plus adding new devices. Use modal window to add new devices.
7. No delete capability for TA users, only Professor users can delete devices from inventory.
8. In addition to TA users' permissions, professor users will also be able to override the signed-in / out status, generate QR code for a device
9. Professor users will need a screen to add new users and assign users with different levels of access.

## Technology Stack
Angular 5 is the framework to build the front end dashboard website. Native Android App and IOS App on the mobile side
Firebase is used as the back end to save all the inventory information.
A REST server back-end which talks to Firebase. This back-end is shared by both the website and the mobile apps.
Use Google Map API to track the current device location.
QR Codes is to be generated on the website and scanned. 
Facial recognition is required for users to borrow (sign out) devices. 

## Development Environment
• Angular5
• Angular router
• RxJS
• Angular Google Map - agm
• Angular2-qrcode
• Bootstrap4 
• CSS3 
• Typescript
• Webpack
• jQuery
• Firebase
• Node.js
• OS: darwin x64

## Development server
Run npm install to install all necessary packages.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`
