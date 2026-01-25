import { useEffect, useState } from "react";
import Table from "../Component/Table";
import Button from "../Component/Button";
import { fetchAllCompanies, deleteCompany } from "../Services/companyService";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCompanies().then(setCompanies);
  }, []);

  return (
    <>
      <h2>All Companies</h2>
      <Table
        columns={["ID", "Name", "Status"]}
        data={companies}
        actions={(row) => (
          <>
            <Button text="View" onClick={() => navigate(`/admin/company/${row.id}`)} />
            <Button text="Delete" variant="danger" onClick={() => deleteCompany(row.id)} />
          </>
        )}
      />
    </>
  );
}
