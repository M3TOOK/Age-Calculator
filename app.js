import datepicker from "js-datepicker";
import { DateTime } from "luxon";

const ageForm = document.querySelector("#ageForm");
const birthDateInput = document.querySelector("#birthDate");
const result = document.querySelector("#result");

const start = datepicker(birthDateInput);

ageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!birthDateInput.value) {
    result.textContent = "Please enter your birth date";
    return;
  }

  const birthDate = DateTime.fromJSDate(new Date(birthDateInput.value));

  const now = DateTime.now();

  if (!birthDate.isValid || birthDate.startOf("day") > now.startOf("day")) {
    result.textContent = "Please enter a valid birth date";
    return;
  }

  const { years, months, days } = now
    .diff(birthDate, ["years", "months", "days"])
    .toObject();

  result.textContent = `You are ${Math.floor(years)} years, ${Math.floor(months)} months, and ${Math.floor(days)} days old.`;
});
