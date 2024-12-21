class Habit{
    name: string;
    date: string;
    
    constructor(name: string, date: string) {
        this.name = name;
        this.date = date;
    }
    
}
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
        newHabits.push(new Habit(habitName, date));
    })
    
    fetch("/api/habits/create", {
        method: "POST",
        headers: {  
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newHabits)
    }).then((response) => {
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