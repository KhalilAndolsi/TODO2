import React, { useEffect, useRef, useState } from "react";
import user from "../../assets/icons/user.svg";
import remove from "../../assets/icons/close.svg";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import logout from "../../assets/icons/logout.svg";
import "./Todo.css";

function Todo() {
  if (localStorage.getItem("todo2") === null) {
    window.location.href = "/login";
  }
  const [data, setData] = useState(null);
  const [editBtn, setEditBtn] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editNow, setEditNow] = useState(null);
  const tasksList = useRef();
  const getData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}login.php`, {
      method: "POST",
      body: localStorage.getItem("todo2"),
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const addNewTask = async () => {
    if (newTask.length > 0) {
      const theNewData = {
        username: data.username,
        password: data.password,
        tasks: {
          tasks: [...data.tasks.tasks, { task: newTask, done: false }],
        },
      };
      await fetch(`${process.env.REACT_APP_API_URL}update.php`, {
        method: "POST",
        body: JSON.stringify(theNewData),
      })
        .then((res) => res.json())
        .then((data) => {
          setNewTask("");
          document.getElementById("newTaskInput").value = "";
          getData();
        })
        .catch((err) => console.error(err));
    }
  };

  const updateCheck = async () => {
    let newTasks = [];
    for (const child of tasksList.current.children) {
      newTasks.push({
        task: child.children[1].innerHTML,
        done: child.children[0].checked,
      });
    }
    const newData = {
      username: data.username,
      password: data.password,
      tasks: {
        tasks: newTasks,
      },
    };
    await fetch(`${process.env.REACT_APP_API_URL}update.php`, {
      method: "POST",
      body: JSON.stringify(newData),
    })
      .then((res) => {
        res.json();
        getData();
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = async (uniqTask) => {
    let newTasks = [];
    for (const child of tasksList.current.children) {
      if (child.getAttribute("data-uniq") !== uniqTask) {
        newTasks.push({
          task: child.children[1].innerHTML,
          done: child.children[0].checked,
        });
      }
    }
    const newData = {
      username: data.username,
      password: data.password,
      tasks: {
        tasks: newTasks,
      },
    };
    await fetch(`${process.env.REACT_APP_API_URL}update.php`, {
      method: "POST",
      body: JSON.stringify(newData),
    })
      .then((res) => {
        res.json();
        getData();
      })
      .catch((err) => console.error(err));
  };

  const editTask = (uniqTask) => {
    setEditBtn(true);
    setEditNow(uniqTask);
    for (const child of tasksList.current.children) {
      if (child.getAttribute("data-uniq") === uniqTask) {
        document.getElementById("newTaskInput").value =
          child.children[1].innerHTML;
      }
    }
  };

  const confirmEdit = async () => {
    let newTasks = [];
    for (const child of tasksList.current.children) {
      if (child.getAttribute("data-uniq") === editNow) {
        child.children[1].innerHTML = newTask;
      }
      newTasks.push({
        task: child.children[1].innerHTML,
        done: child.children[0].checked,
      });
    }

    setNewTask("");
    setEditNow(null);
    setEditBtn(false);
    document.getElementById("newTaskInput").value = "";

    const newData = {
      username: data.username,
      password: data.password,
      tasks: {
        tasks: newTasks,
      },
    };
    await fetch(`${process.env.REACT_APP_API_URL}update.php`, {
      method: "POST",
      body: JSON.stringify(newData),
    })
      .then((res) => {
        res.json();
        getData();
      })
      .catch((err) => console.error(err));
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your acount ?")) {
      await fetch(`${process.env.REACT_APP_API_URL}delete.php`, {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.removeItem("todo2");
            window.location.href = "/login";
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const logoutAccount = () => {
    localStorage.removeItem("todo2");
    window.location.href = "/login";
  }

  return (
    <>
      {data && data.error === undefined ? (
        <>
          <header className="flex flex-nowrap items-center justify-between">
            <h1 className="logo font-semibold text-2xl p-3">TODO2</h1>
            <div className="flex flex-nowrap items-center gap-2 p-3">
              <span className="font-semibold">{data.username}</span>
              <button
                title="remove your account"
                className="deleteAccountBtn grid place-items-center hover:bg-red-600 transition-all rounded-full w-8 h-8"
                onClick={deleteAccount}
              >
                <img src={user} alt="user" className="userIcon w-8 h-8" />
                <img
                  src={remove}
                  alt="trash"
                  className="removeIcon w-8 h-8 hidden"
                />
              </button>
            </div>
          </header>
          <div className="todos w-[95%] md:w-96 rounded-lg border-2 border-zinc-900 m-auto mt-6 p-2">
            <div className="addTask flex flex-nowrap gap-3 mb-5">
              <input
                type="text"
                placeholder="Add a new task"
                className="flex-1 border-2 border-zinc-900 p-2 rounded-md"
                defaultValue={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                id="newTaskInput"
              />
              {!editBtn && editNow === null ? (
                <button
                  className="bg-zinc-900 text-white font-semibold p-2 rounded-md"
                  onClick={addNewTask}
                >
                  ADD
                </button>
              ) : (
                <button
                  className="bg-zinc-900 text-white font-semibold p-2 rounded-md"
                  onClick={confirmEdit}
                >
                  EDIT
                </button>
              )}
            </div>
            <ul className="todosList flex flex-col gap-1" ref={tasksList}>
              {data.tasks.tasks.length > 0 ? (
                data.tasks.tasks.map((d, i) => (
                  <li
                    data-uniq={`tasks-${i}`}
                    key={i}
                    className="p-2 border-2 border-zinc-900 rounded-md flex flex-nowrap gap-3 items-center"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={d.done}
                      onClick={updateCheck}
                    />
                    <span className="flex-1">{d.task}</span>
                    <button
                      onClick={(e) => editTask(`tasks-${i}`)}
                      className="edit relative"
                    >
                      <img src={edit} alt="editIcon" />
                    </button>
                    <button
                      onClick={(e) => deleteTask(`tasks-${i}`)}
                      className="delete relative"
                    >
                      <img src={trash} alt="deleteIcon" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-2 border-2 border-zinc-900 rounded-md text-center">
                  no tasks
                </li>
              )}
            </ul>
            <button
              onClick={logoutAccount}
              className="absolute left-2 bottom-2 font-semibold flex flex-nowrap items-center gap-2 p-2 border-2 border-transparent hover:border-zinc-900 rounded-md transition-all"
            >
              <img src={logout} alt="" />
              LOGOUT
            </button>
          </div>
        </>
      ) : (
        <h1 className="w-screen h-screen grid place-items-center font-bold text-5xl">
          LOADING...
        </h1>
      )}
    </>
  );
}

export default Todo;
