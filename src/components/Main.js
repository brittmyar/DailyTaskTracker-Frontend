import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
    const [ task, setTask ] = useState(null);

    const URL ="http://localhost:4000/people/"

    const getTask = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setTask(data);
    };

    const createTask = async (task) => {
        // make post request to create people
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(task),
        });
        // update list of people
        getTask();
    };

    useEffect(() => getTask(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index task={task} createTask={createTask}     />
        </Route>
        <Route
          path="/Task/:id"
          render={(rp) => (
            <Show
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;
