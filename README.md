# Notes API

Notes API is a mini project that allows user to create notes. 
It has features like OTP generation for Verification sent through email, uploading images, authentication using jsonwebtoken, and limits user request.

## Installation
Step 1: Clone the repository from you local machine
```
git clone https://github.com/bj3rg/BE_PROJECT_Node_TestAPI.git
```
Step 2: Install the node modules
```
npm install node
```
Step 3: Create an env file. Paste the placeholder below and complete the data needed.
To get EMAIL_PASS, go to this link [CREATE_APP_KEY](https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%2Fu%2F8%2Fapppasswords%3Frapt%3DAEjHL4P02W-qY5pYTKBTHyapKWIhy486SS4X1qKqbTAfrDtfTPlIwIb28AeIxbhELnq1W65YF5jJuVPmsX22rvp5NlRzkIgsZZi4tfPIrA_T_1IqZar6BY0&followup=https%3A%2F%2Fmyaccount.google.com%2Fu%2F8%2Fapppasswords%3Frapt%3DAEjHL4P02W-qY5pYTKBTHyapKWIhy486SS4X1qKqbTAfrDtfTPlIwIb28AeIxbhELnq1W65YF5jJuVPmsX22rvp5NlRzkIgsZZi4tfPIrA_T_1IqZar6BY0&ifkv=Ab5oB3r6mcwmXWOZHJnbxEnP5nWqoehvZahMHkijoIFGw0jyreeCoa4wwsqRG_a9zQ0xGdwFuKep&osid=1&passive=1209600&rart=ANgoxcfinlUMDQdNyCGK33QS4YhbWygHuBBFg-_V4eBGWjCmKu5oxr2rhnQB-BRvYYuUD-lTez9KhAmrvJFrwisoSfkitqA1ssDIUG8WMQtgzXrunJ016h4&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1929207014%3A1723639800019341&ddm=0) to create an App Key. Paste your email on EMAIL_USER and generated key on EMAIL_PASS. These are used for nodemailer feature. The secretkey is up to you, you can change the key according to your like.
```
DEVELOPMENT=true
DB_HOST=
DB_USER=
DB_PASS=
PORT=3001
DB_DATABASE=
SECRETKEY=SecretKey
EMAIL_USER=
EMAIL_PASS=
```
Step 4: In the terminal, run the server using the command.
```
npm run start
```

## API Testing
To test the routes, use Postman or Insomnia for creating http requests.

USER ROUTES

Login: POST
```
http://localhost:3001/api/v1/user/login
```
Sign Up: POST
```
http://localhost:3001/api/v1/user/sign-up
```
Update User: PUT
```
http://localhost:3001/api/v1/user/updateUser/:username
```
Find User: GET
```
http://localhost:3001/api/v1/user/find/:username
```
Verify User: POST
```
http://localhost:3001/api/v1/user/verify-user/:id
```

NOTE ROUTES

Create Note: POST
```
http://localhost:3001/api/v1/note/create-note/:id
```
Update Note: PUT
```
http://localhost:3001/api/v1/note/update/:id
```
Delete All Notes: DELETE
```
http://localhost:3001/api/v1/note/delete-all/:user_id
```
Delete Note: DELETE
```
http://localhost:3001/api/v1/note/delete/:id
```
Get Note: GET
```
http://localhost:3001/api/v1/note/:id
```
Find All Notes: GET
```
http://localhost:3001/api/v1/note/find-all/:user_id
```
Note: To be able to use all of the Note routes, authorization is needed. Copy the generated token on the Authorization Bearer Token. If you did not, it will return not authorized.

That's all. Hope you like it!

Coded by:
[Burg](https://github.com/bj3rg)
[Jaycee](https://github.com/Zumiee)



