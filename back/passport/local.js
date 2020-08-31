const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              email,
            },
          });

          // 아이디 존재여부 확인
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
            // done(서버에러, 성공, 클라이언트 에러)
          }

          // 비밀번호 일치여부 확인
          const result = await bcrypt.compare(password, user.password);

          // 성공
          if (result) {
            return done(null, user);
          }

          // 실패
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
