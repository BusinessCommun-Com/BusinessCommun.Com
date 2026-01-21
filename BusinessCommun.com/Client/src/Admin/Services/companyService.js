export async function fetchPendingCompanies() {
  return Promise.resolve([
    { id: 1, name: "TechX", industry: "IT", location: "Bangalore" }
  ]);
}

export async function fetchApprovedCompanies() {
  return Promise.resolve([
    { id: 2, name: "Green Solutions", industry: "Energy", location: "Pune" }
  ]);
}

export async function fetchAllCompanies() {
  return Promise.resolve([
    { id: 1, name: "TechX", status: "Pending" },
    { id: 2, name: "Green Solutions", status: "Approved" }
  ]);
}

export async function approveCompany(id) {
  console.log("Approved:", id);
}

export async function rejectCompany(id) {
  console.log("Rejected:", id);
}

export async function deleteCompany(id) {
  console.log("Deleted:", id);
}

export async function fetchCompanyById(id) {
  return Promise.resolve({
    id,
    name: "TechX",
    industry: "IT",
    location: "Bangalore",
    description: "Startup company"
  });
}
