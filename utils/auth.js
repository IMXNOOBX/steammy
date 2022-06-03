

class auth {
    static clientLogin(client) {
		
		const logOnOptions = {
			accountName : process.env.STEAM_USER,
			password : process.env.STEAM_PASS, 
			twoFactorCode: process.env.STEAM_2FA.length > 0 ? (process.env.STEAM_2FA.length < 7 ? process.env.STEAM_2FA : client.otp.generateAuthCode(process.env.STEAM_2FA)) : null, 
		};
        // client.log.success('[Bot] | Logging in!');
           client.logOn(logOnOptions);
   }
};

module.exports = auth;