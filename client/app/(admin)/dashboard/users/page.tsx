import { UsersClient } from "@/components/admin/users/users.client";
import { serverFetch } from "@/lib/api/server";
import { ApiResponse, User } from "@/types";

export default async function AdminUsersPage() {
  const response: ApiResponse<User[]> = await serverFetch("/users");
  console.log("response", response);

  return (
    <UsersClient initialUsers={response?.data} initialMeta={response.meta} />
  );
}
