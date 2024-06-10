// Edit functionality!
const editTableData = data => {

    // If any other Data is being Edit!
    if (!isNaN(isEditingIndex) && (isEditingIndex !== tableDataArray.indexOf(data))) {
        updateData();
    }

    phoneNumber.value = data.number;
    emailID.value = data.email;
    firstName.value = data.fullName.split(' ')[0];
    lastName.value = data.fullName.split(' ')[1];

    // Adding Radio value in Form
    genderRadioButtons.forEach(radio => {
        if (radio.value === data.gender) {
            radio.checked = true;

            // To retain Gender value! (If user didn't change)
            gender = radio.value;
        }
    });

    // Adding Checkbox values in Form
    hobbiesCheckboxes.forEach(checkbox => {
        checkbox.checked = false;

        if (data.hobbies.includes(checkbox.value)) {
            checkbox.checked = true;

            // To retain Hobbies value! (If user didn't change)
            hobbiesBoolean[checkbox.value] = true;
        }
    });


    // Adding dropdown values in Form 
    reselectDropDown('.country', data.country);
    changingDropDown(
        Object.keys(countries[countryDropDown.value]),
        'state',
        stateDropDown
    );

    reselectDropDown('.state', data.state);
    changingDropDown(
        countries[countryDropDown.value][stateDropDown.value],
        'city',
        cityDropDown
    );

    reselectDropDown('.city', data.city);

    submitButton.value = 'Update';

    // Find Index of Element that have to Edit!
    isEditingIndex = tableDataArray.indexOf(data);

    // Style Editable Row
    const editingRow = document.getElementById(data.id);

    editingRow.style.outline = '2px dashed #444';
    editingRow.style.outlineOffset = '-4px'
    editingRow.style.color = '#aaa';


    // Disabling Email and Phone Number fields!
    emailID.disabled = true;
    phoneNumber.disabled = true;
}


const reselectDropDown = (selector, value) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(location => {
        location.selected = location.value === value;
    });
}


// Remove functionality!
const removeTableData = id => {
    index = tableDataArray.findIndex(data => data.id === +id);
    tableDataArray.splice(index, 1);

    sortTableData(tableDataArray);
}