const emailRegex = /^\w+@\w+\.\w{2,4}$/;

const goodLoginFields = (
  email: string,
  password: string,
): boolean => emailRegex.test(email) && password.length > 6;

export default {
  goodLoginFields,
};
