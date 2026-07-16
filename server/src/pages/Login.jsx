function Login() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      <form className="w-50 mx-auto">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;