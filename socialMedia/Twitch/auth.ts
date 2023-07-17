import passport from 'passport';
import { Strategy as TwitchStrategy } from 'passport-twitch-new';

passport.use(
    new TwitchStrategy(
      {
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: '',
        scope: 'user:read:follows', // Add other required scopes for fetching user information
      },
      (accessToken:any, refreshToken:any, profile:any, done:any) => {
        // Handle the authenticated user's profile data and tokens
        // You can save the tokens in a session or database for future use
        // Call `done(null, profile)` to pass the profile to the next step
      }
    )
  )