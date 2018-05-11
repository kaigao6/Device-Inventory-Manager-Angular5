# Tracker
https://trackr-kaigao.firebaseapp.com/login Welcome to play with it:)

This project is used to track devices' inventory, manage 3 different levels of users.

Client needs: The Mobile Application Design & Development program wants keep track of who currently has which devices in their possession so students are able to borrow (sign out) devices overnight from program frofessors.

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
QR Codes is to be generated on the website and scanned. 
Use Google Map API to track the current device location.
Facial recognition is required for users to borrow (sign out) devices. 
Firebase is used as the back end to save all the inventory information.
Angular 5 is the framework to build the dashboard website. Native Android App and IOS App on the mobile side
A REST server back-end which talks to Firebase. This back-end is shared by both the website and the mobile apps.


## Development server
Run npm install to install all necessary packages.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
