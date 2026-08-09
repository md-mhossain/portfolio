import { SettingsClient } from "@/components/admin/settings/settings.client";
import {serverGetSettings} from "@/lib/api/server";

export default async function AdminSettingsPage() {
  const settings = await serverGetSettings();

  return <SettingsClient initialSettings={settings} />;
}
