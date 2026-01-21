import { useEffect, useState } from "react";
import Table from "../Component/Table";
import Button from "../Component/Button";
import {
  fetchPendingCompanies,
  approveCompany,
  rejectCompany
} from "../Services/companyService";

export default function PendingRequests() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingCompanies();
  }, []);

  async function loadPendingCompanies() {
    setLoading(true);
    const data = await fetchPendingCompanies();
    setPending(data);
    setLoading(false);
  }

  async function handleApprove(id) {
    await approveCompany(id);
    loadPendingCompanies(); // refresh after action
  }

  async function handleReject(id) {
    await rejectCompany(id);
    loadPendingCompanies();
  }

  if (loading) return <p>Loading pending requests...</p>;

  return (
    <div>
      <h2>Pending Requests</h2>

      <Table
        columns={["ID", "Name", "Industry", "Location"]}
        data={pending}
        actions={(row) => (
          <>
            <Button
              text="Approve"
              variant="success"
              onClick={() => handleApprove(row.id)}
            />
            <Button
              text="Reject"
              variant="danger"
              onClick={() => handleReject(row.id)}
            />
          </>
        )}
      />
    </div>
  );
}
