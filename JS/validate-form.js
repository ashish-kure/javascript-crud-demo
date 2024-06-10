// Get Form Data Function!

const getFormData = () => {
  const hobbies = [];

  // Checked hobbies in hobbies array!
  Object.keys(hobbiesBoolean).map((hobby) =>
    hobbies.push(...(hobbiesBoolean[hobby] ? [hobby] : []))
  );

  // Add New data inside tableDataArray!
  const dataObj = {
    id: Date.now(),
    fullName: `${firstName.value} ${lastName.value}`,
    number: phoneNumber.value,
    email: emailID.value.toString(),
    gender: gender,
    hobbies: hobbies.length === 0 ? "-" : hobbies,
    country: countryDropDown.value,
    state: stateDropDown.value,
    city: cityDropDown.value,
  };

  return dataObj;
};

// Validate Fields Function
const validateFields = (element, regex, errorMessage, shouldCheck) => {
  if (shouldCheck) {
    if (!element.value.trim()) {
      removeError(element);

      displayError(element, "Field is Mandatory");
      return false;
    }
  }

  if (!regex.test(element.value)) {
    removeError(element);

    displayError(element, errorMessage);
    return false;
  }

  removeError(element);
  return true;
};

// Validate Gender
const validateGender = () => {
  const genderElement = document.querySelector(".inner-gender-section");

  if (!gender) {
    displayError(genderElement, "Please select a Gender");
    return false;
  }

  removeError(genderElement);
  return true;
};

// Validate Dropdowns
const validateDropDowns = (...dropdowns) => {
  let validity = true;

  dropdowns.forEach((dropdown) => {
    if (dropdown.selectedIndex === 0) {
      displayError(dropdown, `Please select an Option`);
      return (validity = false);
    }

    removeError(dropdown);
    return (validity = true);
  });

  return validity;
};

const validateHobbies = () => {
  const hobbiesElement = document.querySelector(".inner-hobbies-section");

  if (!Object.values(hobbiesBoolean).includes(true)) {
    removeError(hobbiesElement);

    displayError(hobbiesElement, "Please select Hobbies");
    return false;
  }

  removeError(hobbiesElement);
  return true;
};

// Display Errors
const displayError = (element, errorMessage) => {
  const errorElement = document.createElement("div");
  errorElement.className = "error-section";
  errorElement.textContent = errorMessage;

  element.insertAdjacentElement("afterend", errorElement);
};

// Remove Errors
const removeError = (element) => {
  const errorElement = element.parentElement.querySelector(".error-section");

  errorElement && errorElement.remove();
};

// Clear All Errors
const clearAllErrors = () => {
  const errorElements = document.querySelectorAll(".error-section");

  errorElements.forEach((element) => element.remove());
};

// Validate Entire Form
const validateEntireForm = () => {
  // Checking Validations!
  const checkFirstName = validateFields(
    firstName,
    /^[a-zA-Z]+$/,
    "Only letters are allowed",
    true
  );
  const checkLastName = validateFields(
    lastName,
    /^[a-zA-Z]*$/,
    "Only letters are allowed",
    false
  );
  const checkPhoneNumber = validateFields(
    phoneNumber,
    /^[0-9]{1,10}$/,
    "Please enter valid phone number",
    true
  );
  const checkEmail = validateFields(
    emailID,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email",
    true
  );
  const checkDropDowns = validateDropDowns(
    countryDropDown,
    stateDropDown,
    cityDropDown
  );
  const checkHobbies = validateHobbies();
  const checkGender = validateGender();

  const isValid =
    checkFirstName &&
    checkLastName &&
    checkPhoneNumber &&
    checkEmail &&
    checkGender &&
    checkHobbies &&
    checkDropDowns;

  return isValid;
};

// Checking Errors On Input!
firstName.addEventListener("input", () => {
  if (firstName.value.length !== 0) {
    validateFields(firstName, /^[a-zA-Z]+$/, "Only letters are allowed!", true);
  }
});

lastName.addEventListener("input", () => {
  validateFields(lastName, /^[a-zA-Z]*$/, "Only letters are allowed!", false);
});

phoneNumber.addEventListener("input", () => {
  if (phoneNumber.value.length !== 0) {
    validateFields(
      phoneNumber,
      /^[0-9]{1,10}$/,
      "Please enter valid phone number",
      true
    );
  }
});

emailID.addEventListener("input", () => {
  if (emailID.value.length !== 0) {
    validateFields(
      emailID,
      /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/,
      "Please enter a valid email!",
      true
    );
  }
});

genderRadioButtons.forEach((radio) => (radio.onchange = validateGender));

hobbiesCheckboxes.forEach((checkbox) => (checkbox.onchange = validateHobbies));
