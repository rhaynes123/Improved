import {Habit} from "./habit";
import HabitService from "./habitService.js"
const habitList = document.getElementById("habitList") as HTMLDivElement;
const formData = document.getElementById("formData") as HTMLDivElement;

const addHabitButton = document.getElementById("addHabitBtnId") as HTMLButtonElement;
const saveHabitButton = document.getElementById("submitAllBtn") as HTMLButtonElement;

const addHabit = () => {
    const newHabit = formData.cloneNode(true) as HTMLDivElement;
    newHabit.classList.add("habit-row");
    habitList.appendChild(newHabit);
}
addHabitButton.addEventListener("click", addHabit);
// Show the alert
const showAlert = (message: string, type: "success" | "danger") => {

    let alert = document.getElementById("alert") as HTMLDivElement;
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.classList.remove("d-none");
};

const saveHabits = () => {
    let newHabits : Habit[] = [];
    let habitRows = document.querySelectorAll(".habit-row");
    
    habitRows.forEach((habitRow) => {
        let habitName = (habitRow.querySelector("[name='habitName']") as HTMLInputElement).value;
        let date = (habitRow.querySelector("[name='startDate']") as HTMLInputElement).value;
        let newHabit : Habit = {
            name : habitName,
            date : date,
        };
        newHabits.push(newHabit);
    })
    
    HabitService.create(newHabits).then((response) => {
        if (response.ok) {
            showAlert("Habits successfully submitted!", "success");
            return response.json();
        }
        else {
            showAlert("Error creating Habit!", "danger");
            console.error("Error creating Habit");
        }
    })
    
}
saveHabitButton.addEventListener("click", saveHabits);

async function searchForHabit( name : String): Promise<Habit[]>  | null {
   return await HabitService.findHabit(name)
}
const newHabitName = document.getElementById("habitId") as HTMLInputElement;
newHabitName.addEventListener('keyup', async(e) => {
    let habitNameErrorField = document.getElementById("habitNameErrorFieldId") as HTMLInputElement;
    let habitname = e.target as HTMLInputElement
    if(await searchForHabit(habitname.value) === null) {
        habitNameErrorField.setAttribute("hidden", "hidden");
        addHabitButton.disabled = false;
    }
    else {
        habitNameErrorField.innerText = 'Habit Already Exists';
        habitNameErrorField.removeAttribute("hidden");
        addHabitButton.disabled = true;
    }
})