const fs = require("fs");
const yargs = require("yargs");

const argv = yargs
  .command("add", "Add a new task", (yargs) => {
    return yargs.option("title", {
      alias: "t",
      describe: "Task title",
      type: "string",
      demandOption: true,
    });
  })
  .command("list", "List all tasks")
  .command("remove", "Remove task", (yargs) => {
    return yargs.option("id", {
      alias: "i",
      describe: "Id of task to be removed",
      type: "number",
      demandOption: true,
    });
  })
  .command("complete", "Complete task", (yargs) => {
    return yargs.option("id", {
      alias: "i",
      describe: "Id of task to be completed",
      type: "number",
      demandOption: true,
    });
  })
  .help()
  .alias("h", "help").argv;

function addTask(title) {
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  const newTask = {
    id: tasks.length + 1,
    title: title,
    completed: false,
  };
  tasks.push(newTask);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
}

function getTasks() {
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  console.log(tasks);
  return tasks;
}

function removeTaskById(taskId) {
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  // console.log(tasks);
  const index = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(index, 1);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
  // console.log(tasks);
}

function markTaskCompleted(taskId) {
  const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
  // console.log(tasks);
  const index = tasks.findIndex((task) => task.id === taskId);
  tasks[index].completed = true;
  fs.writeFileSync("tasks.json", JSON.stringify(tasks));
  // console.log(tasks);
}

switch (argv._[0]) {
  case "add":
    addTask(argv.title);
    break;
  case "list":
    getTasks();
    break;
  case "remove":
    removeTaskById(argv.id);
    getTasks();
    break;
  case "complete":
    markTaskCompleted(argv.id);
    getTasks();
    break;
  default:
    console.log("Invalid command");
    break;
}

// const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
// console.log(tasks);
