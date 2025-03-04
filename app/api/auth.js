import { dashboardClient, authClient, setAuthToken } from './client';

const getOtp = (email) => authClient.get(`send-otp/${email}`);
const verifyOtp = (email, otp) => authClient.post('verify-otp', { email, otp });
const setPassword = (email, password) => authClient.post('signup', { email, password });
const loginWithPassword = (email, password, loginMethod) => authClient.post('login', { email, password, loginMethod });
const loginWithPassPhrase = (email, passPhrase, loginMethod) => authClient.post('login', { email, passPhrase, loginMethod });
const loginWithPincode = (email, pinCode, loginMethod) => authClient.post('login', { email, pinCode, loginMethod });
const additionalInfo = (accountDetails) => authClient.put('additional-info', accountDetails);
const createPassphrase = (email, passPhrase) => authClient.post('create/passphrase', {email, passPhrase});
const createPincode = (email, pinCode) => authClient.post('create/pincode', {email, pinCode});
const enableBiometrics = () => authClient.put('enable-biometric');
const biometricsLogin = (biometricToken, loginMethod) => authClient.post('biometric-login', { biometricToken, loginMethod });

const fetchUserDetails = () => dashboardClient.get('dashboard/rider/details');

export default {
    getOtp,
    verifyOtp,
    setPassword,
    loginWithPassword,
    loginWithPassPhrase,
    loginWithPincode,
    additionalInfo,
    createPassphrase,
    createPincode,
    fetchUserDetails,
    setAuthToken,
    enableBiometrics,
    biometricsLogin
}