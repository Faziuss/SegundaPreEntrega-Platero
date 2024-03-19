import passport from "passport";
import local from "passport-local";
import userModel from "../dao/fileManager/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        /* if (!first_name || !last_name || !email || !age || !password) {
            throw new AppError(400, { message: "Missing data" });
          } */

        let user = await userModel.findOne({ email: username });

        try {
          if (user) {
            return done(null, false);
          }

          const newUser = { first_name, last_name, email, age, password: createHash(password) };
          const result = await userModel.create(newUser)
          console.log(newUser);
          return done(null, result)

        } catch (error) {
            return done(error)
        }
      }
    )
  );

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return done(null, false)
        }
        if(!isValidPassword(user, password)){
            return done(null, false)
        } 

        return done(null, user)
    } catch (error) {
        return done(error)
    }

}))
};

passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    let user = await userModel.findById(id)
    done(null, user);
})

export default initializePassport