export async function fetchDashboardSummary() {
 
  return Promise.resolve({
    totalCompanies: 42,
    pending: 8,
    approved: 30,
    rejected: 4,
  });
}

export async function fetchRecentActivities() {
  
  return Promise.resolve([
    {
      action: "PENDING",
      message: "Startup TechX submitted a new request",
      time: "2 minutes ago",
    },
    {
      action: "APPROVED",
      message: "Admin approved Green Solutions Pvt Ltd",
      time: "1 hour ago",
    },
    {
      action: "REJECTED",
      message: "Admin rejected Alpha Innovations",
      time: "Yesterday",
    },
  ]);
}
