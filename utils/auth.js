const logOnOptions = {
	accountName : process.env.STEAM_USER,
	password : process.env.STEAM_PASS, 
	// twoFactorCode: process.env.STEAM_2FA
	// twoFactorCode: client.otp.generateAuthCode(process.env.STEAM_2FA) 
};

class auth {
    static clientLogin(client) {
        // client.log.success('[Bot] | Logging in!');
           client.logOn(logOnOptions);
   }
};

module.exports = auth;