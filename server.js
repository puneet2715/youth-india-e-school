import express from "express";
import { google } from "googleapis";
import axios from "axios";
import GoogleCalenderInitView from "./views/GoogleCalenderInitView.js";
import GoogleCalenderRedirectView from "./views/GoogleCalenderRedirectView.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const app = express();
dotenv.config();

/*
 * 1. Create a new Express app.
 * 2. Create a new route for the /rest/v1/calendar/init endpoint.
 * 3. Create a new OAuth2 client.
 * 4. Generate an authentication URL.
 * 5. Redirect the user to the authentication URL.
 * 6. Create a new route for the /rest/v1/calendar/redirect endpoint.
 * 7. Exchange the authorization code for an access token.
 * 8. Set the access token on the OAuth2 client.
 * 9. Create a new Calendar instance.
 * 10. Retrieve the events from the primary calendar.
 * 11. Send the events to the client.
 * 12. Start the server.
 */

/*
  @desc: Prompts the user to grant permission for the application to access the user's calendar.
*/
app.get("/rest/v1/calendar/init", GoogleCalenderInitView);

/*
  @desc: Exchanges the authorization code for an access token and retrieves the events from the primary calendar.
*/
app.get("/rest/v1/calendar/redirect", GoogleCalenderRedirectView);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
