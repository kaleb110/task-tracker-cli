const { writeFile, readFile } = require("fs");
const path = require("path")
const PATH = path.join(__dirname, "../data/tasks");

async function readTasks() {
  try {
    return new Promise((resolve, reject) => {
      readFile(PATH, "utf-8", (err, data) => {
        if (err) reject("Error reading task file.");
        else resolve(JSON.parse(data || "[]"));
      });
    });
  } catch (error) {
    console.log(`Error occured: ${error.message}`);
  }
}

async function writeTasks(tasks) {
  try {
    return new Promise((resolve, reject) => {
      writeFile(PATH, JSON.stringify(tasks, null, 2), (err) => {
        if (err) reject("Error writing to task file.");
        else resolve();
      });
    });
  } catch (error) {
    console.log(`Error occured: ${error.message}`);
  }
}

module.exports = { readTasks, writeTasks };
