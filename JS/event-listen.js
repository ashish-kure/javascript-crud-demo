// FOR FORM

// Submit Button
form.addEventListener('submit', (event) => {
    // Prevents default form events (like - Reloading page!)
    event.preventDefault();

    // Clear All previous errors
    clearAllErrors();

    // Validate Entire Form
    const isValid = validateEntireForm();

    isValid && (isNaN(isEditingIndex) ? insertDataWithSort() : updateData());
    // Above is same as using with - if (true) {}
});


// Cancel button
cancelButton.addEventListener('click', () => {
    if (!isNaN(isEditingIndex)) {
        const editableRow = document.getElementById(tableDataArray[isEditingIndex].id);
        editableRow.style.outline = '';
        editableRow.style.color = '';
    }

    clean();
});



// FOR TABLE

// Edit Button Listener
tableBody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit-button')) {
        const row = target.closest('tr');
        const data = tableDataArray.find(data => data.id === +row.id);

        target.disabled = true;

        clearAllErrors();
        editTableData(data);
    }

});


// Remove Button Listener
tableBody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('remove-button')) {
        const row = target.closest('tr');

        if (confirm('Do you really want to remove this data?')) {
            removeTableData(row.id);
        }
    }
});



// Searching & Sorting!
searchField.addEventListener('input', () => searchTableData(tableDataArray));

sortDropDown.addEventListener('change', () => {
    searchedData = searchField.value ? searchedData : undefined;

    sortTableData(searchedData);
});



// Reset Button!
resetButton.addEventListener('click', () => {
    searchField.value = null;

    resetDropDow(sortDropDown, searchByDropDown);
    sortTableData(tableDataArray);
});