import { useState } from "react";
import { Link } from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [ newForm, setNewForm ] = useState({
    description: "",
    date: "",
    time: "",
    important: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createTasks(newForm);
    setNewForm({
    description: "",
    date: "",
    time: "",
    important: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.tasks.map((task) => (
      <div
      key={task._id} 
      className="task">
        <Link to={`/tasks/${task._id}`}>
        <h1>{task.description}</h1></Link>
        <h3>{task.date}</h3>
        <h3>{task.time}</h3>
        <h3>{task.important}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="date"
          value={newForm.date}
          name="date"
          placeholder="date"
          onChange={handleChange}
        />
        <input
          type="time"
          value={newForm.time}
          name="time"
          placeholder="time"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.important}
          name="important"
          placeholder="important ?"
          onChange={handleChange}
        />

        <input type="submit" value="Create Task" />
      </form>
      {props.tasks ? loaded() : loading()}
    </section>
  );
}

export default Index;

 