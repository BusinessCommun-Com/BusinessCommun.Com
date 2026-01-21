import { useEffect, useState } from "react";
import Table from "../Component/Table";
import Button from "../Component/Button";
import { fetchAdmins, removeAdmin } from "../Services/adminService";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins().then(setAdmins);
  }, []);

  return (
    <>
      <h2>Admin Management</h2>
      <Table
        columns={["ID", "Name", "Email"]}
        data={admins}
        actions={(row) => (
          <Button text="Remove" variant="danger" onClick={() => removeAdmin(row.id)} />
        )}
      />
    </>
  );
}
