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

  //delete handler
  const handleDelete = async (id) => {
    try {
      
      await deleteCompany(id);

      alert("Company Deleted Successfully");

     
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== id)
      );
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete Failed ");
    }
  };
  
  return (
    <>
      <h2>All Companies</h2>
      <Table
        columns={["ID", "Name", "Status"]}
        data={companies}
        actions={(row) => (
          <>
            <Button text="View" onClick={() => navigate(`/admin/company/${row.id}`)} />
            <Button text="Delete"
              variant="danger"
              onClick={() => handleDelete(row.id)} />
          </>
        )}
      />
    </>
  );
}
