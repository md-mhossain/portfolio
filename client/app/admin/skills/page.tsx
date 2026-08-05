import { skillsApi } from "@/lib/api/skills";
import { SkillsClient } from "@/components/admin/skills/skills.client";

export default async function AdminSkillsPage() {
  const response = await skillsApi.list({
    limit: 100,
  });

  return <SkillsClient initialSkills={response.data} />;
}
