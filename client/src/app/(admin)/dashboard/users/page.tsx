import { UsersClient } from "@/components/admin/users/users.client";
import { ApiResponse, User } from "@/types";
import {serverFetch} from "@/app/actions";

export default async function AdminUsersPage() {
  const response: ApiResponse<User[]> = await serverFetch("/users");


  return (
    <UsersClient initialUsers={response?.data} initialMeta={response.meta} />
  );
}
