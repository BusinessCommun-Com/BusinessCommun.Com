import { useEffect, useState } from "react";
import Table from "../Component/Table";
import Button from "../Component/Button";
import { fetchAdmins, removeAdmin } from "../Services/adminService";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    const data = await fetchAdmins();
    setAdmins(data);
  }

  async function handleRemove(id) {
    await removeAdmin(id);
    loadAdmins();
  }

  return (
    <>
      <h2>Admin Management</h2>

      <Table
        columns={["ID", "Name", "Email"]}
        data={admins}
        actions={(row) => (
          <Button
            text="Remove"
            variant="danger"
            onClick={() => handleRemove(row.id)}
          />
        )}
      />
    </>
  );
}
