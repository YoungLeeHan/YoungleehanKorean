import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// 구글 인증 로직
export default function configurePassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                // get the user data from google
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    images: (profile && profile.photos[0].value) || "",
                    email: (profile && profile.emails[0].value) || "",
                    password: (profile && profile.password) || "",
                };
                console.log("새유저있냐?", newUser);
                console.log(profile);

                try {
                    // find the user in our database
                    const user = await User.findOne({
                        googleId: profile.id,
                    });

                    if (user) {
                        // If user is present in our database.
                        done(null, user);
                    } else {
                        // if user is not present in our database, save user data to the database.
                        const user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                    done(err, null);
                }
            }
        )
    );

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                done(new Error("User not found"), null);
            } else {
                done(null, user);
            }
        } catch (err) {
            done(err, null);
        }
    });
}
