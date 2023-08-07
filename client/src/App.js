import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const getUsers = () => {
    axios
      .get("http://localhost:3000/getusers")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>leonard</h1>

      <form
        action="/createuser"
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          setName("");
          setAge("");
          setEmail("");
          const userData = {
            name: name,
            age: age,
            email: email,
          };

          await axios
            .post("http://localhost:3000/createuser", userData)
            .then((res) => console.log("user created successfulyy:", res.data))
            .catch((err) => console.error(err));

          await getUsers();
        }}
      >
        <div>
          <label htmlFor="">name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="">age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">submit</button>
      </form>

      {users ? (
        <div className="user-container">
          {users.map((user, i) => {
            return (
              <div key={i} className="user-box">
                <p>{user.name}</p>
                <p>{user.age}</p>
                <p>{user.email}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="loader">loading</div>
      )}
    </div>
  );
}

export default App;
