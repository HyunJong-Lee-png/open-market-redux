import axios from 'axios';
import express from 'express';
const router = express.Router();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';

const dbServer = 'http://localhost:3000/users';

router.post('/signIn',
  (req, res, next) => {
    console.log(1)
    passport.authenticate('local')(req, res, next);
  }, (req, res) => {
    res.send('ok');
  });

//로그인 인증
passport.use('local', new LocalStrategy({
  usernameField: 'userId',
  passwordField: 'password',
}, async (id, password, done) => {
  console.log('패스포트야', id, password);
  const response = await axios.get(`${dbServer}?userId=${id}`);
  const user = response.data[0];
  if (!user) {
    console.log('아이디가 없어요');
    return done(null, false, { message: 'incorrect userId' });
  }
  const salt = Buffer.from(user.salt.data);
  const hashed_password = Buffer.from(user.hashed_password.data);
  crypto.pbkdf2(password, salt, 160000, 32, 'sha256', (err, hashedKey) => {
    if (err) {
      console.log('에러임')
      return done(err);
    }
    if (!crypto.timingSafeEqual(hashedKey, hashed_password)) {
      console.log('비밀번호가달라요');
      return done(null, false, { message: 'incorrect password' });
    }
    console.log('로그인완료');
    return done(null, user);
  })
}));

//회원가입
router.post('/signUp', async (req, res, next) => {
  try {
    const response = await axios.get(`${dbServer}?userId=${req.body.userId}`);
    const user = response.data[0];
    if (!user) {
      const salt = crypto.randomBytes(16);
      await axios.post(`${dbServer}`, {
        userId: req.body.userId,
        userName: req.body.userName,
        hashed_password: crypto.pbkdf2Sync(req.body.password, salt, 160000, 32, 'sha256'),
        salt,
        email: req.body.email,
      });
      res.send('ok');
    };
  } catch (e) {
    next(e);
  }
});

passport.serializeUser((user, done) => {
  if (user) {
    return done(null, user.id);
  }
});

passport.deserializeUser(async (id, done) => {
  const response = await axios.get(`${dbServer}?id=${id}`);
  const user = response.data[0];
  return done(null, user);
})

export default router;
