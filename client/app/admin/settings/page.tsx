import { SettingsClient } from "@/components/admin/settings/settings.client";
import { settingsApi } from "@/lib/api";

export default async function AdminSettingsPage() {
  const settings = await settingsApi.get();

  return <SettingsClient initialSettings={settings} />;
}
