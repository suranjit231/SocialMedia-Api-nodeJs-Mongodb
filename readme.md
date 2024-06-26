# Social Media API Documentation

**Please refer to the Swagger documentation for detailed information and test by opening at the specified port.**

This API, built using Node.js, Express, and MongoDB database, provides endpoints for a social media application, enabling users to perform various actions such as user registration, authentication, posting, commenting, liking posts, managing friendships, and more.

## Configuration

**To use this API, please configure the `.env` file with:**
- `DB_URL` for MongoDB
- `SECRET_KEY` for JWT token
- `EMAIL` for sends email
- `PASS`for Email

**Install necessary dependencies by running:**
```bash
npm i

**Total: 27 API endpoints**

### 1. User Operations

1. **User Registration:** `/api/users/signup`  
   Endpoint to register a new user with required information such as name, email, password, and gender.

2. **User Login:** `/api/users/signin`  
   Endpoint to authenticate a user and generate a JWT token for further authenticated requests.

3. **User Logout:** `/api/users/logout`  
   Endpoint to logout the currently authenticated user from the application.

4. **User Details:** `/api/users/get-details/{userId}`  
   Endpoint to retrieve details of a user by their ID.

5. **All Users Details:** `/api/users/get-all-details`  
   Endpoint to retrieve details of all users registered in the application.

6. **Update User Details:** `/api/users/update-details/{userId}`  
   Endpoint to update user details, including profile picture and gender.

### 2. Post Operations

1. **Create Post:** `/api/posts`  
   Endpoint to create a new post with an image and a caption.

2. **Update Post:** `/api/posts/update/{postId}`  
   Endpoint to update an existing post by its ID.

3. **Get Post by ID:** `/api/posts/getone/{postId}`  
   Endpoint to retrieve details of a post by its ID.

4. **Delete Post:** `/api/posts/{postId}`  
   Endpoint to delete a post by its ID.

5. **Get User Posts:** `/api/posts/user-post/{userId}`  
   Endpoint to retrieve posts of a user by their ID.

### 3. Comment Operations

1. **Create Comment:** `/api/comments/{postId}`  
   Endpoint to post a new comment for a specific post.

2. **Get All Comments for Post:** `/api/comments/getall/{postId}`  
   Endpoint to retrieve all comments for a specific post.

3. **Delete Comment:** `/api/comments/{commentId}`  
   Endpoint to delete a comment by its ID.

4. **Update Comment:** `/api/comments`  
   Endpoint to update an existing comment.

### 4. Like Operations

1. **Toggle Like:** `/api/likes/{postId}`  
   Endpoint to toggle like for a post.

2. **Count Likes:** `/api/likes/{postId}`  
   Endpoint to count likes on a post.

### 5. Friendship Operations

1. **Send Friend Request:** `/api/friendship/send`  
   Endpoint to send a friend request to another user.

2. **Accept Friend Request:** `/api/friendship/accept/{requestDocId}`  
   Endpoint to accept a friend request by request document ID.

3. **Reject Friend Request:** `/api/friendship/reject/{requestDocId}`  
   Endpoint to reject a friend request by request document ID.

4. **Get All Friends:** `/api/friendship/getAllFriend`  
   Endpoint to retrieve all friends of the current user.

5. **Get All Friendship Status:** `/api/friendship/getAllStatus`  
   Endpoint to retrieve the friendship status of all friends of the current user.

6. **Get All Pending Friend Requests:** `/api/friendship/getPending-request`  
   Endpoint to retrieve all pending friend requests of the current user.

### 6. Reset Password Operations

1. **Get OTP:** `/api/otp/send`  
   Endpoint to send OTP to the registered email ID for password reset.

2. **Verify OTP:** `/api/otp/verify`  
   Endpoint to verify OTP for resetting the password.

3. **Reset Password:** `/api/otp/reset-password`  
   Endpoint to reset user password after OTP verification.

**For all endpoints, authentication using JWT token is required. Make sure to include the token in the Authorization header of the request.**

**Please refer to the Swagger documentation for detailed information on request parameters, responses, and security definitions.**


**( Developed by suranjt namasudra )**





