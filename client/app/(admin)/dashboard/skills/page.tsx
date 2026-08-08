import { SkillsClient } from "@/components/admin/skills/skills.client";
import { serverListSkills } from "@/lib/api/server";

export default async function AdminSkillsPage() {
  const response = await serverListSkills({
    limit: 100,
  });

  return <SkillsClient initialSkills={response.data} />;
}
