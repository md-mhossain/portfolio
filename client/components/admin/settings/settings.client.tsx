'use client';

import { useState } from 'react';



import { SettingsTabs } from './settings.tabs';
import { SettingsForm } from './settings.form';

interface SettingsClientProps {
    initialSettings: any;
}

export function SettingsClient({
                                   initialSettings,
                               }: SettingsClientProps) {
    const [tab, setTab] = useState('general');


    return (
        <div className="space-y-6">
            <SettingsTabs
                activeTab={tab}
                onChange={setTab}
            />

            <SettingsForm
                initialData={initialSettings as any}
            />
        </div>
    );
}