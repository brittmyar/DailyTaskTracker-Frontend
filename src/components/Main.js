import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [ tasks, setTasks ] = useState(null);

  const URL = "http://localhost:4000/tasks/";


  const getTasks = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setTasks(data);
  };

  const createTasks = async (task) => {
    // make post request to create tasks
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(task),
    });
    // update list of tasks
    getTasks();
  };

  const updateTasks = async (task, id) => {
    // make put request to create tasks
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(task),
    });
    // update list of tasks
    getTasks();
  }

  const deleteTasks = async id => {
    // make delete request to create tasks
    await fetch(URL + id, {
      method: "DELETE",
    })
    // update list of tasks
    getTasks();
  }

  useEffect(() => getTasks(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index tasks={tasks} createTasks={createTasks} />
        </Route>
        <Route
          path="/Tasks/:id"
          render={(rp) => (
            <Show
              tasks={tasks}
              updateTasks={updateTasks}
              deleteTasks={deleteTasks}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;
