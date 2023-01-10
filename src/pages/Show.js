import { useState } from "react"


function Show(props) {
  const id = props.match.params.id
  const tasks = props.tasks
  const task = tasks.find(p => p._id === id)

  // state for form
  const [ editForm, setEditForm ] = useState(task);

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  }

  // handlesubmit for form
  const handleSubmit = event => {
    event.preventDefault();
    props.updateTasks(editForm, task._id);
    // redirect task back to index
    props.history.push("/");
  }

  const removeTask = () => {
    props.deletetasks(task._id);
    props.history.push("/");
  }

  return (
    <div className="task">
      <h1>{task.description}</h1>
      <h2>{task.date}</h2>
      <h2>{task.time}</h2>
      <h2>{task.important}</h2>
      <button id="delete" onClick={removeTask}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="date"
          value={editForm.date}
          name="date"
          placeholder="date"
          onChange={handleChange}
        />
        <input
          type="time"
          value={editForm.time}
          name="time"
          placeholder="time"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.important}
          name="important"
          placeholder="important"
          onChange={handleChange}
        />
        <input type="submit" value="Update Task" />
      </form>
      
    </div>
  )
}

export default Show

