# Early Access Email Server

Tiny backend for the pilot signup form.

## Setup

1. Copy `.env.example` to `.env` and fill in your SMTP values.
2. Install dependencies:
   - `npm install`
3. Start the server:
   - `npm start`

Default URL: `http://localhost:3001/api/early-access`

## Frontend

Set `VITE_SIGNUP_ENDPOINT` in your frontend environment to this backend URL, for example:

`VITE_SIGNUP_ENDPOINT=http://localhost:3001/api/early-access`
