first, please install package busboy

`npm instal busboy`


If you don't already have a package.json, create one by running the following command from the root of your JavaScript project:
`npm init`

Install the npm package firebase and save it to package.jsonyour file by running:
`npm install --save firebase`

Test to make sure that the CLI is installed and correctly accessing your account by listing your Firebase project. Run the following command:
`firebase projects:list`

Installed the Firebase CLI 
`npm install -g firebase-tools`

Start the login process by running the following command:
`firebase login`
atau 
`firebase login:ci`

Initialize your Firebase project. Run the following command from the root of your local application directory:
`firebase init functions`
atau 
`firebase init --token "serial_token"`

Deploy to your site. Run the following command from your app's main directory:
`firebase deploy`
atau 
`firebase deploy --token "serial_token"`


if any eror like this,
```
firebase : File C:\...\...\...\firebase.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see 
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ firebase deploy --token "1//0gCNY8Lu4p8xKCgYIARAAGBASNwF-L9IrfRbMqgj0 ...
+ ~~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess `
```

You can use this code,
`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

after that you can re-deploy your project
