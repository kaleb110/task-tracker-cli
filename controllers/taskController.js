const { readTasks, writeTasks } = require("../utils/fileUtils");
const { askQuestion, printSeparator } = require("../utils/cliUtils");

async function addTask() {
  try {
    const taskDescription = await askQuestion("Enter task description: >> ");
    const status = await askQuestion(
      "Mark status: \n1. Done\n2. To Do\n3. In Progress \n>> "
    );

    const tasks = await readTasks();
    let statusValue = { todo: false, inProgress: false, done: false };

    if (status == 1) statusValue.done = true;
    else if (status == 2) statusValue.todo = true;
    else if (status == 3) statusValue.inProgress = true;

    const createdAt = new Date();
    const newTask = {
      id: tasks.length + 1,
      description: taskDescription,
      status: statusValue,
      createdAt: createdAt.toLocaleString(),
      updatedAt: createdAt.toLocaleString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    printSeparator();
    console.log(`✅ Task added successfully (ID: ${newTask.id})`);
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
}

async function updateTask() {
  const tasks = await readTasks();
  const taskId = parseInt(
    await askQuestion("Enter task ID to update: >> "),
    10
  );

  if (taskId > 0 && taskId <= tasks.length) {
    const updatedDescription = await askQuestion("Enter new description: >> ");
    tasks[taskId - 1].description = updatedDescription;
    tasks[taskId - 1].updatedAt = new Date().toLocaleString();
    await writeTasks(tasks);

    printSeparator();
    console.log(`🔄 Task updated successfully (ID: ${taskId})`);
  } else {
    console.log("❌ Invalid task ID.");
  }
}

async function deleteTask() {
  const tasks = await readTasks();
  const taskId = parseInt(
    await askQuestion("Enter task ID to delete: >> "),
    10
  );

  if (taskId > 0 && taskId <= tasks.length) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await writeTasks(updatedTasks);

    printSeparator();
    console.log(`🗑️ Task deleted successfully!`);
  } else {
    console.log("❌ Invalid task ID.");
  }
}

async function listTasks() {
  const tasks = await readTasks();
  const filterOption = await askQuestion(
    "\n1. List all tasks\n2. List done tasks\n3. List tasks to do\n4. List tasks in progress\n>> "
  );

  let filteredTasks = tasks;
  if (filterOption == 2)
    filteredTasks = tasks.filter((task) => task.status.done);
  if (filterOption == 3)
    filteredTasks = tasks.filter((task) => task.status.todo);
  if (filterOption == 4)
    filteredTasks = tasks.filter((task) => task.status.inProgress);

  filteredTasks.forEach((task, index) => {
    console.log(
      `📝 Task ${index + 1}: ${task.description}\n   Status: ${getStatus(
        task.status
      )}\n   Created: ${task.createdAt}\n   Updated: ${task.updatedAt}`
    );
  });

  if (filteredTasks.length === 0) console.log("No tasks found.");
}

function getStatus(status) {
  if (status.done) return "✅ Done";
  if (status.todo) return "🕒 To Do";
  if (status.inProgress) return "🚧 In Progress";
}

module.exports = { addTask, updateTask, deleteTask, listTasks };
