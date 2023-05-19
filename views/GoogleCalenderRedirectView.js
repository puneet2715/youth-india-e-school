import { google } from "googleapis";
import axios from "axios";

export default async function (req, res) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const { code } = req.query;

  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const { access_token } = data;
  oauth2Client.setCredentials({ access_token });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, response) => {
      if (err) {
        console.error("The API returned an error:", err);
        res.status(500).send("An error occurred");
        return;
      }

      const events = response.data.items;
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(events);
      // res.setHeader("Content-Type", "text/html");
      // res.write("<p>Upcoming events:</p>");
      // res.write("<ul>");
      // events.map((event) => {
      //   res.write(
      //     `<li>${event.summary} -> <a href=${event.htmlLink} target="_blank">Calender Link</a> </li>`
      //   );
      // });
      // res.write("</ul>");
      res.end();
    }
  );
}
