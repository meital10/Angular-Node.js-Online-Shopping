module.exports = {
    dbConfig: {
        uri: 'mongodb+srv://meital:1961@cluster0.ggtxa.mongodb.net/shopping',
        collection: 'sessions',
    },
    cookieConfig: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60000,
    },
    passwordHash: "my_secret&@#$@!#$",
    sessionSecret: 'my_secret_john_bryce!$@#$'
};