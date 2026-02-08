var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HabitService from "./habitService.js";
const habitList = document.getElementById("habitList");
const formData = document.getElementById("formData");
const newHabitName = document.getElementById("habitId");
const addHabitButton = document.getElementById("addHabitBtnId");
const saveHabitButton = document.getElementById("submitAllBtn");
const addHabit = () => {
    const newHabit = formData.cloneNode(true);
    newHabit.classList.add("habit-row");
    habitList.appendChild(newHabit);
};
// Show the alert
const showAlert = (message, type) => {
    let alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.classList.remove("d-none");
};
const saveHabits = () => {
    let newHabits = [];
    let habitRows = document.querySelectorAll(".habit-row");
    habitRows.forEach((habitRow) => {
        let habitName = habitRow.querySelector("[name='habitName']").value;
        let date = habitRow.querySelector("[name='startDate']").value;
        let notes = habitRow.querySelector("[name='habitNotes']").value;
        let newHabit = {
            name: habitName,
            date: date,
            notes: notes,
        };
        newHabits.push(newHabit);
    });
    HabitService.create(newHabits).then((response) => {
        if (response.ok) {
            showAlert("Habits successfully submitted!", "success");
            return response.json();
        }
        else {
            showAlert("Error creating Habit!", "danger");
            console.error("Error creating Habit");
        }
    });
};
function habitExists(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield HabitService.findHabit(name)) !== null;
    });
}
saveHabitButton.addEventListener("click", saveHabits);
addHabitButton.addEventListener("click", addHabit);
function lookUpHabit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        let habitNameErrorField = document.getElementById("habitNameErrorFieldId");
        let habitname = e.target;
        if (!(yield habitExists(habitname.value))) {
            habitNameErrorField.setAttribute("hidden", "hidden");
            addHabitButton.disabled = false;
        }
        else {
            habitNameErrorField.innerText = 'Habit Already Exists';
            habitNameErrorField.removeAttribute("hidden");
            addHabitButton.disabled = true;
        }
    });
}
const debouncedHabits = _.debounce(lookUpHabit, 300);
newHabitName.addEventListener('keyup', debouncedHabits);
//# sourceMappingURL=app.js.map