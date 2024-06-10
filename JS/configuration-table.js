// DOM
const searchField = document.querySelector('.search-text');
const searchByDropDown = document.querySelector('#search-by');

const sortDropDown = document.querySelector('#sort');
const resetButton = document.querySelector('.reset-button');

let searchedData;

// Search Function!
const searchTableData = array => {
    const searchByValue = searchByDropDown.value;
    const searchText = searchField.value.toLowerCase().trim();

    // RegExp constructor is used, cause RegExp literal is Constant value!
    const searchPattern = new RegExp(`^${searchText}`);

    const showSearchedData = array.filter(data => {
        if (searchByDropDown.selectedIndex === 0) {
            let result;

            data.fullName.split(' ').forEach(name => {
                result = searchByFunction(searchPattern, name);
            });

            return result || searchByFunction(searchPattern, data[searchByValue]);
        }

        else {
            return searchByFunction(searchPattern, data[searchByValue]);
        }
    });

    searchedData = showSearchedData;
    sortTableData(showSearchedData);
}

// Search By Function 
const searchByFunction = (pattern, value) => {
    return pattern.test(value.toString().toLowerCase());
}



// Sorting Function
const sortTableData = (filteredData = null) => {
    const dataToSort = filteredData ? filteredData : tableDataArray;
    const sortOrder = sortDropDown.value;

    // Deep Copy
    const sortingArray = JSON.parse(JSON.stringify(dataToSort));

    switch (sortDropDown.selectedIndex) {
        case 0:
            return displayData(dataToSort);

        case 1:
            return displayData(sortingArray.reverse());
    }

    // Sorting, except for first two options!
    sortingArray.sort((dataA, dataB) => {
        const compareResult = sortOrder === 'Ascending'
            ? dataA.fullName.toLowerCase().localeCompare(dataB.fullName.toLowerCase())
            : dataB.fullName.toLowerCase().localeCompare(dataA.fullName.toLowerCase());

        return compareResult;
    });

    displayData(sortingArray);
}


// Cleaning function!
function clean() {
    form.reset();
    removePreviousDropDown(stateDropDown, cityDropDown)
    Object.keys(hobbiesBoolean).map(hobby => hobbiesBoolean[hobby] = false);
    gender = '';
    isEditingIndex = undefined;
    submitButton.value = 'Submit';
    clearAllErrors();
    document.querySelectorAll('.edit-button').forEach(button => button.disabled = false);
    emailID.disabled = false;
    phoneNumber.disabled = false;
}


sortTableData(tableDataArray);