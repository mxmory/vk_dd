import { Router, Link } from "@reach/router";
import { FormPage } from "../FormPage/index";
import { AdminTable } from "../AdminTable/index";
import { Chart } from '../Chart/index';

export const App = () => {
  return (
    <div className="App">
      <header className="header">
        <img
          src="https://i.ibb.co/FxfFJK6/logo-1.png"
          alt="vezdekod x vkontakte"
        />
      </header>
      <Router>
        <FormPage path="task-form-10" />
        <AdminTable path="task-admin-table-20" />
        <Chart path="task-chart-30"/>
      </Router>

      <nav>
        <Link to="task-form-10">Form</Link>
        <Link to="task-admin-table-20">Admin panel</Link>
        <Link to="task-chart-30">Chart</Link>
      </nav>
    </div>
  );
};

export default App;
