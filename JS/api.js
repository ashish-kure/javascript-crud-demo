const authURL = "https://www.universal-tutorial.com/api/getaccesstoken";
let authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2hpc2hrdXJlMDhAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiaXd3d1Z2YkxRRUJvTHZtMnlFN2wtSVdScWxJWnlZN2tnSjJjUmJzaFY4VnJlelJKZkhZWnduaEMxX1dmTzRCeUJWayJ9LCJleHAiOjE3MTAwOTM2NzF9.mC1L7b1mvNfggOmvqahc4cNfJUQH2J_e_yQVJnBx96A';

const headers = new Headers();
headers.append('Authorization', authToken);
headers.append("Accept", "application/json");

const optionObject = { headers: headers };

const countriesObject = {};


const fetchData = async (url ,options) => {
    try {
        const response = await fetch(url, options);
        const responseJSON = await response.json();

        return responseJSON;
    }

    catch (error) {
        console.log(error);
    }
}



const fetchAPI = async () => {
    try {
        const countries = await fetchData('https://www.universal-tutorial.com/api/countries', 
        optionObject);

        countries.forEach(country => {
            countriesObject[country.country_name] = {};
        })

        console.log(0);
    } catch (error) {
        console.log(error);
    }
    
}



async function fetchStateAPI() {
    try {
        for (const country in countriesObject) {
            const states = await fetchData('https://www.universal-tutorial.com/api/states/'+country,
            optionObject);

            console.log(states);

            if (states !== undefined) {
                states.forEach(state => {
                    if (state !== undefined) {
                        countriesObject[country][state.state_name] = [];
                    }
                });
            }
        }

        console.log(1);

    } catch (error) {
        console.log(error);
    }
}




async function fetchCityAPI() {
    try {
        for (const country in countriesObject) {
            for (const state in countriesObject[country]) {
                const cities = await fetchData('https://www.universal-tutorial.com/api/cities/'+state, 
                optionObject);

                console.log(cities, state, country);

                if (cities !== undefined) {
                    cities.forEach(city => {
                        if (city !== undefined) {
                            countriesObject[country][state].push(city.city_name);
                        }
                    })
                }
            }

            console.log(countriesObject);
        }
    } catch (error) {
        console.log(error);
    }
}


fetchAPI()
    .then(fetchStateAPI)
    .then(fetchCityAPI);














// // JavaScript for DEMO!

// // ... (Your existing code)

// // Select or create an element to display error messages
// const errorDisplay = document.createElement('div');
// errorDisplay.classList.add('error-display');
// document.body.appendChild(errorDisplay);

// // Validate Form Data Function
// const validateFormData = () => {
//     let isValid = true;

//     // Validate First Name
//     if (!firstName.value.trim()) {
//         isValid = false;
//         showError("First Name is mandatory");
//     }

//     // Validate Email
//     if (!emailID.value.trim() || !validateEmail(emailID.value)) {
//         isValid = false;
//         showError("Invalid or empty email address");
//     }

//     // Validate Gender
//     if (!gender) {
//         isValid = false;
//         showError("Gender is mandatory");
//     }

//     // Validate Country
//     if (countryDropDown.value === 'hidden') {
//         isValid = false;
//         showError("Country is mandatory");
//     }

//     // Validate State
//     if (stateDropDown.value === 'hidden') {
//         isValid = false;
//         showError("State is mandatory");
//     }

//     // Validate City
//     if (cityDropDown.value === 'hidden') {
//         isValid = false;
//         showError("City is mandatory");
//     }

//     return isValid;
// };

// // Helper function to display error messages
// const showError = (message) => {
//     errorDisplay.textContent = message;
//     setTimeout(() => {
//         errorDisplay.textContent = '';
//     }, 3000); // Clear error message after 3 seconds
// };

// // Get Form Data Function
// const getFormData = () => {
//     if (validateFormData()) {
//         const hobbies = [];

//         // Checked hobbies in hobbies array!
//         Object.keys(hobbiesBoolean).map(hobby => hobbies.push(...(hobbiesBoolean[hobby] ? [hobby] : ['-'])));

//         // Add New data inside tableDataArray!
//         const dataObj = {
//             fullName: `${firstName.value} ${lastName.value || '-'}`,
//             email: emailID.value,
//             gender: gender,
//             hobbies: hobbies,
//             country: countryDropDown.value,
//             state: stateDropDown.value,
//             city: cityDropDown.value,
//             creationTime: Date.now()
//         };

//         tableDataArray.push(dataObj);
//         displayData(tableDataArray);
//     }
// };


// // JavaScript for DEMO!

// // ... (Your existing code)

// // Configuration object for form field validation rules
// const validationConfig = {
//     firstName: {
//         required: true,
//         regex: /^[a-zA-Z]+$/,
//         errorMessage: "First Name is mandatory and should contain only letters."
//     },
//     lastName: {
//         required: false, // Last Name is optional
//         regex: /^[a-zA-Z]+$/,
//         errorMessage: "Last Name should contain only letters."
//     },
//     email: {
//         required: true,
//         regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         errorMessage: "Invalid or empty email address."
//     },
//     gender: {
//         required: true,
//         errorMessage: "Gender is mandatory."
//     },
//     country: {
//         required: true,
//         errorMessage: "Country is mandatory."
//     },
//     state: {
//         required: true,
//         errorMessage: "State is mandatory."
//     },
//     city: {
//         required: true,
//         errorMessage: "City is mandatory."
//     }
// };

// // Select or create an element to display error messages
// const errorDisplay = document.createElement('div');
// errorDisplay.classList.add('error-display');
// document.body.appendChild(errorDisplay);

// // Validate Form Data Function
// const validateFormData = () => {
//     let isValid = true;

//     // Iterate through form fields and apply validation rules
//     Object.keys(validationConfig).forEach(fieldName => {
//         const fieldConfig = validationConfig[fieldName];
//         const fieldValue = document.getElementById(fieldName).value.trim();

//         if (fieldConfig.required && !fieldValue) {
//             isValid = false;
//             showError(fieldConfig.errorMessage);
//         } else if (fieldConfig.regex && !fieldConfig.regex.test(fieldValue)) {
//             isValid = false;
//             showError(fieldConfig.errorMessage);
//         }
//     });

//     return isValid;
// };

// // Helper function to display error messages
// const showError = (message) => {
//     errorDisplay.textContent = message;
//     setTimeout(() => {
//         errorDisplay.textContent = '';
//     }, 3000); // Clear error message after 3 seconds
// };

// // ... (Your existing code)






// const errorElement = document.createElement('div');
// errorElement.className = 'error-section';

// function validateName(name, element) {
//     if (!name) {
//         displayError(element, 'Field is mandatory!');
//         return false;
//     }

//     if (!/^[a-zA-Z]+$/.test(name)) {
//         displayError(element, 'Only letters are valid!');
//         return false;
//     }

//     removeError(element);
//     return true;
// }

// function validateEmail(email, element) {
//     if (!email) {
//         displayError(element, 'Email is mandatory!');
//         return false;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         displayError(element, 'Please enter a valid email format!');
//         return false;
//     }

//     removeError(element);
//     return true;
// }

// function validateGender() {
//     const genderElement = document.querySelector('.inner-gender-section');

//     if (!gender) {
//         displayError(genderElement, 'Please select a gender!');
//         return false;
//     }

//     removeError(genderElement);
//     return true;
// }

// function displayError(element, message) {
//     errorElement.textContent = message;
//     element.parentElement.append(errorElement);
// }

// function removeError(element) {
//     errorElement.remove();
// }

// const validateAllFields = (dataObj) => {
//     const firstNameValid = validateName(dataObj.fullName.split(' ')[0], firstName);
//     const lastNameValid = validateName(dataObj.fullName.split(' ')[1], lastName);
//     const emailValid = validateEmail(dataObj.email, emailID);
//     const genderValid = validateGender();

//     if (firstNameValid && lastNameValid && emailValid && genderValid) {
//         if (isEditData >= 0) {
//             tableDataArray[isEditData] = dataObj;
//             displayData(tableDataArray);
//         } else {
//             tableDataArray.push(dataObj);
//             displayData(tableDataArray);
//         }
//     }
// }

// firstName.addEventListener('input', () => validateName(firstName.value, firstName));
// lastName.addEventListener('input', () => validateName(lastName.value, lastName));
// emailID.addEventListener('input', () => validateEmail(emailID.value, emailID));





// FORBIDDEN!!!!!

// const changeStateDropDown = () => {
//     removePreviousDropDown(stateDropDown, cityDropDown);

//     Object.keys(countries[countryDropDown.value]).map(state => {
//         const optionElement = document.createElement('option');
//         optionElement.textContent = state;

//         optionElement.className = 'state';
//         optionElement.setAttribute('value', state);

//         stateDropDown.append(optionElement);
//     })

//     document.querySelector('#hidden-state').selected = true;
//     document.querySelector('#hidden-city').selected = true;
// }

// const changeCityDropDown = () => {
//     removePreviousDropDown(cityDropDown);

//     const [currentCountry, currentState] = [countryDropDown.value, stateDropDown.value];

//     countries[currentCountry][currentState].map(city => {
//         const optionElement = document.createElement('option');
//         optionElement.textContent = city;

//         optionElement.className = 'city';
//         optionElement.setAttribute('value', city);

//         cityDropDown.append(optionElement);
//     });

//     document.querySelector('#hidden-city').selected = true;
// }






// // Adding Drop Down values in Form
// const countriesClass = document.querySelectorAll('.country');
// countriesClass.forEach(country => {
//     if (country.value === data.country) {
//         country.selected = true;
//     }

//     changeStateDropDown();
// });

// const stateClass = document.querySelectorAll('.state');
// stateClass.forEach(state => {
//     if (state.value === data.state) {
//         state.selected = true;
//     }

//     changeCityDropDown();
// });

// const cityClass = document.querySelectorAll('.city');
// cityClass.forEach(city => {
//     if (city.value === data.city) {
//         city.selected = true;
//     }
// });