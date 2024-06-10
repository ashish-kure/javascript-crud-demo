// Display Data Function
const displayData = (array) => {

    // Removing All the Data first! 
    tableBody.innerHTML = '';
    noDataAvailElement.innerHTML = '';

    if (array.length === 0) {
        noDataAvailElement.textContent = `No Data Available`;
    }

    array.map(data => {

        const tableRow = table.insertRow();
        tableRow.id = data.id;

        Object.keys(data).map(element => {
            const tableData = tableRow.insertCell();

            if (element === 'email') {
                const linkTag = document.createElement('a');

                linkTag.href = `mailto:${data[element]}`;
                linkTag.textContent = data[element];

                tableData.append(linkTag);
            }

            else {
                tableData.textContent = data[element];
            }
        });

        // Adding Edit & Remove Button!
        const editButtonCell = tableRow.insertCell();
        const removeButtonCell = tableRow.insertCell();

        // Modification buttons
        const editButton = document.createElement('button');
        const removeButton = document.createElement('button');

        editButton.className = 'button edit-button';
        removeButton.className = 'button remove-button';

        editButton.textContent = 'Edit';
        removeButton.textContent = 'Remove';

        // Inserting button in <td>
        editButtonCell.append(editButton);
        removeButtonCell.append(removeButton);

        tableBody.append(tableRow);
    });

    // Cleaning Function
    clean();
}



const updateData = () => {
    tableDataArray[isEditingIndex] = getFormData();
    return sortTableData(tableDataArray);
}


const insertDataWithSort = () => {
    tableDataArray.push(getFormData());
    return sortTableData(tableDataArray);
}