// main.js
const { askQuestion, printSeparator, closeCLI } = require("./utils/cliUtils");
const {
  addTask,
  updateTask,
  deleteTask,
  listTasks,
} = require("./controllers/taskController");

async function mainApp() {
  printSeparator();
  const res = await askQuestion(
    "Task Tracker CLI: \n1. Add Task \n2. Update Task \n3. Delete Task \n4. List Tasks\n5. Exit\n>> "
  );
  printSeparator();

  switch (res) {
    case "1":
      await addTask();
      break;
    case "2":
      await updateTask();
      break;
    case "3":
      await deleteTask();
      break;
    case "4":
      await listTasks();
      break;
    case "5":
      console.log("Exiting Task Tracker. Goodbye!");
      closeCLI();
      return;
    default:
      console.log("❌ Invalid option.");
  }

  await promptContinue();
}

async function promptContinue() {
  const continueAsk = await askQuestion(
    "\nPress 1 to restart or any key to exit\n>> "
  );
  if (continueAsk == 1) await mainApp();
  else closeCLI();
}

mainApp();
