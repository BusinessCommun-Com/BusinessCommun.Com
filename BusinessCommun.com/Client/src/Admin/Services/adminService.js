export async function fetchAdmins() {
  return Promise.resolve([
    { id: 1, name: "Admin One", email: "admin1@mail.com" }
  ]);
}

export async function addAdmin(admin) {
  console.log("Admin added", admin);
}

export async function removeAdmin(id) {
  console.log("Admin removed", id);
}
