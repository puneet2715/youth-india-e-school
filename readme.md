## Backend Assignment

In this assignment you have to implement google calendar integration using rest API. You need to
use the OAuth2 mechanism to get users calendar access. Below are detail of API endpoint and
corresponding views which you need to implement –

1. /rest/v1/calendar/init/ - GoogleCalendarInitView()
   <br>
   This view should start step 1 of the OAuth. Which will prompt the user for his/her credentials.
2. /rest/v1/calendar/redirect/ -> GoogleCalendarRedirectView()
   <br>
   This view will do two things –
   i) Handle redirect requests sent by google with code for token. You need to implement
   a mechanism to get access_token from given code.
   ii) Once you get the access_token get a list of events in the user's calendar

## Setup

```bash
# Install dependencies
npm install

# Run the server
npm start
```
