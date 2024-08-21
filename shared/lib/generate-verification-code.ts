export const generateVerificationCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    return randomCode.toString();
};
