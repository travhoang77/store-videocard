export const firstNameValidation = (firstname) => {
  if (firstname.trim() === "") {
    return "First name is required";
  }
  if (/[^a-zA-Z -]/.test(firstname)) {
    return "Invalid characters";
  }
  if (firstname.trim().length < 3) {
    return "First name require at least 3 characters";
  }
  if (firstname.trim().length > 100) {
    return "First name too long";
  }
  return null;
};

export const lastNameValidation = (lastname) => {
  if (lastname.trim() !== "") {
    if (/[^a-zA-Z -]/.test(lastname)) {
      return "Invalid characters";
    }
    if (lastname.trim().length < 2) {
      return "Last name require at least 3 characters";
    }
    if (lastname.trim().length > 100) {
      return "Last name too long";
    }
  }
  return null;
};

export const streetAddressValidation = (address) => {
  if (address.trim() === "") {
    return "Address is required";
  }

  if (address.trim().length > 1000) {
    return "Address too long";
  }
  return null;
};

export const cityValidation = (city) => {
  if (city.trim() === "") {
    return "City is required";
  }
  if (/[^a-zA-Z -]/.test(city)) {
    return "Invalid characters";
  }
  if (city.trim().length > 100) {
    return "Input too long";
  }
  return null;
};

export const zipCodeValidation = (zipcode) => {
  if (zipcode.trim() === "") {
    return "Zipcode is required";
  }

  if (!/^\d{5}(-\d{4})?$/.test(zipcode)) {
    return "Invalid zipcode";
  }

  return null;
};
