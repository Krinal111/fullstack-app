import React from "react";
import Button from "../../components/Button";
import { logoutAction } from "../../redux/actions/authAction";


function Dashboard() {
  return (
    <div>
      <Button
        onClick={() => logoutAction()}
        type="primary"
        className="!bg-sidebar !px-4 !py-2 m-5"
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
