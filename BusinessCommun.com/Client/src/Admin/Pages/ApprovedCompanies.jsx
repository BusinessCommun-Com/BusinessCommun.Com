import { useEffect, useState } from "react";
import Table from "../Component/Table";
import { fetchApprovedCompanies } from "../Services/companyService";

export default function ApprovedCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchApprovedCompanies().then(setCompanies);
  }, []);

  return (
    <>
      <h2>Approved Companies</h2>
      <Table columns={["ID", "Name", "Industry", "Location"]} data={companies} />
    </>
  );
}
