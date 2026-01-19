window.onload = loadHabits;

// Add habit
function addHabit() {
  const input = document.getElementById("habitInput");
  const habitText = input.value.trim();

  if (!habitText) {
    alert("Please enter a habit!");
    return;
  }

  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push({ name: habitText, completed: false });
  localStorage.setItem("habits", JSON.stringify(habits));

  input.value = "";
  loadHabits();
}

// Load and display habits
function loadHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  let completedCount = 0;

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    if (habit.completed) completedCount++;

    li.className = habit.completed ? "completed" : "";

    li.innerHTML = `
      <div>
        <input type="checkbox" class="checkbox" onclick="toggleComplete(${index})" ${habit.completed ? 'checked' : ''}>
        <span>${habit.name}</span>
      </div>
      <span class="delete" onclick="removeHabit(${index})">✖</span>
    `;

    list.appendChild(li);
  });

  // Update stats
  document.getElementById("totalHabits").textContent = `Total: ${habits.length}`;
  document.getElementById("completedHabits").textContent = `Completed: ${completedCount}`;
}

// Toggle completed
function toggleComplete(index) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits[index].completed = !habits[index].completed;
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

// Delete habit
function removeHabit(index) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.splice(index, 1);
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}
