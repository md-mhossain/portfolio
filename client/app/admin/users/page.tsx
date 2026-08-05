import { usersApi } from "@/lib/api/users";
import { UsersClient } from "@/components/admin/users/users.client";

export default async function AdminUsersPage() {
  const response = await usersApi.list({
    page: 1,
    limit: 10,
  });

  return (
    <UsersClient initialUsers={response.data} initialMeta={response.meta} />
  );
}
