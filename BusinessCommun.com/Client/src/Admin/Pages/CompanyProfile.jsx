import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCompanyById } from "../Services/companyService";

export default function CompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompanyById(id).then(setCompany);
  }, [id]);

  if (!company) return <p>Loading...</p>;

  return (
    <>
      <h2>{company.name}</h2>
      <p><b>Industry:</b> {company.industry}</p>
      <p><b>Location:</b> {company.location}</p>
      <p>{company.description}</p>
    </>
  );
}
