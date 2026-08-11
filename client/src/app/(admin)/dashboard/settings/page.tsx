import { SettingsClient } from "@/components/admin/settings/settings.client";
import {serverGetSettings} from "@/app/actions";

export default async function AdminSettingsPage() {
  const settings = await serverGetSettings();

  return <SettingsClient initialSettings={settings} />;
}
