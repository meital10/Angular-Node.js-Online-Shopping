module.exports = {
  dbConfig: {
    // uri: "mongodb+srv://meital:1961@cluster0.ggtxa.mongodb.net/shopping",
    uri: process.env.MONGO_URI,
    collection: "sessions",
  },
  cookieConfig: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60000,
  },
  passwordHash: process.env.PASSWORD_HASH,
  sessionSecret: process.env.SESSION_SECRET,
};
