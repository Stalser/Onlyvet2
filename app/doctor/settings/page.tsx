// app/doctor/settings/page.tsx
'use client';
export default function SettingsPage(){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3" style={{color:'var(--navy)'}}>Настройки</h3>
      <p className="opacity-80 text-sm">Здесь будут настройки профиля врача, интеграции (Vetmanager), рабочие статусы и т.д.</p>
    </div>
  );
}
