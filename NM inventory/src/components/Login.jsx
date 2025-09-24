import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [message, setMessage] = useState("");

  // Handle login or registration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNewUser) {
      // Register new user
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[username]) {
        setMessage("Username already exists!");
      } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("User registered successfully! You can now login.");
        setIsNewUser(false);
        setUsername("");
        setPassword("");
      }
    } else {
      // Login existing user
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[username] && users[username] === password) {
        setMessage(`Welcome back, ${username}!`);
        setUsername("");
        setPassword("");
      } else {
        setMessage("Invalid username or password!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isNewUser ? "Register" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
        >
          {isNewUser ? "Register" : "Login"}
        </button>

        <div className="text-center">
          {isNewUser ? "Already have an account?" : "New user?"}{" "}
          <span
            onClick={() => {
              setIsNewUser(!isNewUser);
              setMessage("");
            }}
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            {isNewUser ? "Login" : "Register"}
          </span>
        </div>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
