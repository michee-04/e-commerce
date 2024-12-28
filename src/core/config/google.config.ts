import PassportGoogleAuth from './passport';

const googleAuth = new PassportGoogleAuth(CONFIG.google);

export const passportInstance = googleAuth.getPassportInstance();
