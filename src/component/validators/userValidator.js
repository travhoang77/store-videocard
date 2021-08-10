import { emailExists, validateCurrentPassword } from "../../fetches/userFetch";
export const passwordlength = 6;

export const nameValidation = (name) => {
  if (name.trim() === "") {
    return "Name is required";
  }
  if (/[^a-zA-Z -]/.test(name)) {
    return "Invalid characters";
  }
  if (name.trim().length < 3) {
    return "Name require at least 3 characters";
  }
  return null;
};

export const emailValidation = async (email) => {
  let message = null;
  if (email.trim() === "") {
    return "Email is required";
  }

  if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "Please enter a valid email";
  }

  const result = await emailExists(email);

  if (result.success) message = result.message;

  return message;
};
export const emailLoginValidation = (email) => {
  let message = null;
  if (email.trim() === "") {
    return "Email is required";
  }

  if (
    !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "Please enter a valid email";
  }

  return message;
};

export const passwordValidation = (password) => {
  if (password.trim() === "") {
    return "Password is required";
  }
  if (password.length < passwordlength) {
    return `At least ${passwordlength} characters`;
  }

  if (!/[A-Z]/.test(password)) {
    return "Must have a uppercase character";
  }

  if (!/[a-z]/.test(password)) {
    return "Must have a lowercase character";
  }

  if (!/\d/.test(password)) {
    return "Must have a number";
  }

  if (!/\W/.test(password)) {
    return "Must have a symbol";
  }
  return null;
};

export const currentPasswordValidation = async (
  authtoken,
  userid,
  password
) => {
  if (password.trim() === "") {
    return "Current password is required";
  }

  const result = await validateCurrentPassword(authtoken, userid, password);

  return result.success ? null : result.message;
};

export const passwordLoginValidation = (password) => {
  if (password.trim() === "") {
    return "Password is required";
  }
  if (password.length < passwordlength) {
    return `At least ${passwordlength} characters`;
  }
  return null;
};

export const confirmationValidation = (password, confirmation) => {
  if (confirmation.trim() === "") {
    return "Password is required";
  }

  if (password !== confirmation) {
    return "Passwords much match";
  }

  return null;
};
