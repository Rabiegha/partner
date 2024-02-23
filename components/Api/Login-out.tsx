// Filename: AuthenticationService.js
import axios from 'axios';
import {Buffer} from 'buffer';

// Function to encode email and password to Base64
const encodeBase64 = value => Buffer.from(value).toString('base64');

// Login Function
// Example loginUser function adjustment for error handling
export const loginUser = async (email, password) => {
  try {
    const encEmail = encodeURIComponent(encodeBase64(email));
    const encPassword = encodeURIComponent(encodeBase64(password));

    // Construct URL with query parameters
    const url = `https://ems.choyou.fr/event_api/ajax_user_login/?enc_email=${encEmail}&enc_password=${encPassword}`;

    // Make a GET request with Axios to the constructed URL
    const response = await axios.get(url);

    return response; // Return the full response object
  } catch (error) {
    console.error('Error during login:', error);
    // Return a structured response indicating failure
    return {data: {status: false, error: 'Login request failed'}};
  }
};

// Logout Function
// Logout Function
export const logoutUser = async sessionId => {
  console.log('Session ID for logout:', sessionId);

  try {
    // Assuming sessionId or token is used for logout
    const url = `https://ems.choyou.fr/event_api/ajax_user_logout/?session_id=${sessionId}`;
    const response = await axios.post(url);

    if (response.data.status) {
      console.log('Logout Successful');
    } else {
      console.log('Logout Failed');
    }
  } catch (error) {
    console.error('Logout Error:', error);
  }
};
