import passport from 'passport';
import express from 'express';
import session from 'express-session';
const app = express();
import cors from 'cors';
import userRouter from './Router/UserRouter.js';

app.set('PORT', 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'my-login',
  cookie: {
    httpOnly: true,
    maxAge: 300000,

  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);

app.use((req, res, next) => {
  next('없는페이지');
})
app.use((err, req, res, next) => {
  res.send(err.message);
})

app.listen(app.get('PORT'));

