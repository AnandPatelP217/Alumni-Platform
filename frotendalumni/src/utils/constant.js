const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const IMAGE_BASE_PATH = "./images/";

export const isNotEmpty = (value) => {
  if (value.length > 2 && value !== "" && value !== null && value !== undefined)
    return true;
  else return false;
};

export const messageHasLength = (mess) => {
  if (mess.length > 10) return true;
  else return false;
};

export const numberCheck = (num) => {
  if (num.length < 7) return false;
  for (let n of num) {
    if (isNaN(Number(n))) return false;
  }
  return true;
};

export const validateEmail = (mail) => {
  if (emailRegExp.test(mail.toLowerCase())) return true;
  else return false;
};

// Additional validation helpers
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  // Validate 10-digit phone number
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input) => {
  // Basic XSS prevention
  return input.replace(/[<>]/g, '');
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};
