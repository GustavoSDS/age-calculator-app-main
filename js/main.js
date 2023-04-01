const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const btn_Calc = document.querySelector('#btn-calc');
const labels = document.querySelectorAll(".date__label");
const messages = document.querySelectorAll(".date__message-error");

const ageInDays = document.querySelector("#days")
const ageInMonths = document.querySelector("#months")
const ageInYears = document.querySelector("#years")

btn_Calc.addEventListener('click', function () {
    validateInputs(day, month, year);
});


function validateInputs(day, month, year) {
    let valDate = day.value && month.value && year.value;

    if (valDate) {
        let years = year.value; let months = month.value; let days = day.value;
        if (validateAge(years, months, days).isValid) {
            removeClass(day);
            removeClass(month);
            removeClass(year);
            ageInYears.innerText = validateAge(years, months, days).age;
            ageInMonths.innerText = validateAge(years, months, days).month;
            ageInDays.innerText = validateAge(years, months, days).day;
        } else {
            addClass(day, false);
            addClass(month, false);
            addClass(year, false);
        }
    } else {
        addClass(day, true);
        addClass(month, true);
        addClass(year, true);
    }
}

function addClass(element, empty) {
    element.classList.add("date__error");
    labels.forEach(label => label.classList.add("date__error"));
    messages.forEach(message => message.classList.remove("date__display"));
    if (empty) {
        messages.forEach(message => message.innerHTML = "This field is required");
    } else {
        messages[0].innerHTML = "Must be a valid day"
        messages[1].innerHTML = "Must be a valid month"
        messages[2].innerHTML = "Must be in the past"
    }
}

function removeClass(element) {
    element.classList.remove("date__error");
    labels.forEach(label => label.classList.remove("date__error"));
    messages.forEach(message => message.classList.add("date__display"));
    messages.forEach(message => message.innerHTML = ``);
}

function validateAge(year, month, day) {
    let dateOfBirth = new Date(year, month - 1, day);
    let currentDate = new Date();
    let ageInMilliseconds = currentDate - dateOfBirth;

    let ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    let ageInMonths = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));
    let ageInDays = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));

    let isValid = (currentDate.getFullYear() > year && year >=100) && (month >= 1 && month <= 12) && day > 0 && day <= new Date(year, month, 0).getDate();

    return { isValid: isValid, age: ageInYears, month: ageInMonths, day: ageInDays };
}