import {Habit} from "./habit";

export default class HabitService {
    static async findHabit(name: String): Promise<Habit[]> | null {
        const response = await fetch(`/api/habits/find/${name}`)
        if (!response.ok) {
            return null;
        }
        return await response.json();
    }
    
    static create(newHabits : Habit[]) : Promise<any> {
        return fetch("/api/habits/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newHabits)
        })
    }
}

