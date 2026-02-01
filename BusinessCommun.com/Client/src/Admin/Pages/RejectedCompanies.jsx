import { useEffect, useState } from "react";
import Table from "../Component/Table";
import { fetchAdminRejectedCompanies } from "../Services/companyService";

export default function RejectedCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchAdminRejectedCompanies().then(setCompanies);
  }, []);

  return (
    <>
      <h2>Rejected Companies</h2>
      <Table columns={["ID", "Name", "Industry", "Location"]} data={companies} />
    </>
  );
}
