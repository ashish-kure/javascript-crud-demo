// DOM Accessing!
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const emailID = document.querySelector("#email");
const phoneNumber = document.querySelector('#number');

const genderRadioButtons = document.querySelectorAll('input[type="radio"]');
const hobbiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');

const table = document.querySelector(".table");
const tableBody = document.querySelector("tbody");

const countryDropDown = document.querySelector("#country");
const stateDropDown = document.querySelector("#state");
const cityDropDown = document.querySelector("#city");

const submitButton = document.querySelector(".submit-button");
const cancelButton = document.querySelector(".cancel-button");

const noDataAvailElement = document.querySelector(".no-data-avail");
const form = document.querySelector(".form");

let isEditingIndex;

// Getting Radio button value
let gender = "";
genderRadioButtons.forEach((radio) => {
    radio.onclick = () => (gender = radio.checked ? radio.value : "");
});

// Getting Checkbox values
const hobbiesBoolean = {
    Traveling: false,
    Reading: false,
    Singing: false,
    Dancing: false,
};

hobbiesCheckboxes.forEach((checkbox) => {
    checkbox.onclick = () => {
        if (checkbox.checked) {
            hobbiesBoolean[checkbox.value] = true;
        } else {
            hobbiesBoolean[checkbox.value] = false;
        }
    };
});

const countries = {
    India: {
        Gujarat: ["Surat", "Ahmedabad", "Vadodara", "Kutch"],
        Maharashtra: ["Mumbai", "Pune", "Kolhapur", "Jalgaon"],
        "Madhya Pradesh": ["Ujjain", "Bhopal", "Indore", "Sanchi"],
        "Jammu and Kashmir": ["Rajauri", "Pulwama", "Srinagar", "Uri"],
    },

    "United States": {
        California: ["Barstow", "Avalon", "Bell", "Brea"],
        Texas: ["Abilene", "Beverly Hill", "Claude", "Emory"],
        "New Jersey": ["Atlantic City", "Dunellen", "Glassboro", "Livingston"],
        Washington: ["Aberdeen", "Coupeville", "Dishman", "Geneva"],
    },

    Brazil: {
        "Rio de Janeiro": ["Areal", "Macuco", "São Pedro", "Tanguá"],
        "São Paulo": ["Agudos", "Bocaina", "Catanduva", "Gália"],
        Pará: ["Irituia", "Castanhal", "Aurora do Pará", "Piçarra"],
        Alagoas: ["Atalaia", "Belém", "Olivença", "Traipu"],
    },

    Canada: {
        Ontario: ["Algoma", "Burlington", "Elliot Lak", "Greenstone"],
        Quebec: ["Barraute", "Cabano", "Cookshire", "Gaspé"],
        Nunavut: ["Kugluktuk", "Iqaluit", "Rankin Inlet", "Clyde River"],
        Alberta: ["Athabasca", "Gibbons", "Laurel", "Sylvan Lake"],
    },

    Japan: {
        Tohoku: ["Miyagi", "Akita", "Fukushima", "Aomori"],
        Kanto: ["Tokyo", "Chiba", "Gunma", "Kanagawa"],
        Chugoku: ["Okoyama", "Hiroshima", "Yamaguchi", "Shimane"],
        Kyushu: ["Fukuoka", "Okinawa", "Nagasaki", "Oita"],
    },
};

// All about Dropdown list!
const changingDropDown = (...args) => {
    const [iterableElement, nameOfClass, addToDropDown] = args;

    iterableElement.forEach((location) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = location;

        optionElement.value = location;
        optionElement.className = nameOfClass;

        addToDropDown.append(optionElement);
    });
};

const removePreviousDropDown = (...args) => {
    args.map((dropdown) => {
        Object.values(dropdown.options).forEach((element) => {
            if (element.value !== "hidden") {
                element.remove();
            }
        });
    });
};

const resetDropDow = (...dropdowns) => {
    dropdowns.forEach((dropdown) => (dropdown.selectedIndex = 0));
};

// Country event listener!
countryDropDown.addEventListener("change", () => {
    removePreviousDropDown(stateDropDown, cityDropDown);

    const iterableElement = Object.keys(countries[countryDropDown.value]);

    changingDropDown(iterableElement, "state", stateDropDown);
    resetDropDow(stateDropDown, cityDropDown);

    validateDropDowns(countryDropDown);
});

// State event listener!
stateDropDown.addEventListener("change", () => {
    removePreviousDropDown(cityDropDown);

    const iterableElement = countries[countryDropDown.value][stateDropDown.value];

    changingDropDown(iterableElement, "city", cityDropDown);
    resetDropDow(cityDropDown);

    validateDropDowns(stateDropDown);
});

// City event listener!
cityDropDown.addEventListener("change", () => validateDropDowns(cityDropDown));

// Adding two default data inside tableDataArray!
let tableDataArray = [
    {
        id: Date.now(),
        fullName: "Yogesh Goti",
        number: 9988776655,
        email: "goti@gmail.com",
        gender: "Male",
        hobbies: ["Traveling", "Singing"],
        country: "India",
        state: "Gujarat",
        city: "Surat",
    },

    {
        id: Date.now() + 1,
        fullName: "Richa Malhan",
        number: 1122334455,
        email: "richa@gmail.com",
        gender: "Female",
        hobbies: ["Reading", "Singing", "Dancing"],
        country: "India",
        state: "Jammu and Kashmir",
        city: "Pulwama",
    },
];
