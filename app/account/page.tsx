// app/account/page.tsx
'use client';

import PullToRefresh from '../../components/PullToRefresh';
import Reveal from '../../components/Reveal';

export default function AccountPage() {
  return (
    <div className="container py-12">
      <PullToRefresh>
        <Reveal>
          <h1 className="text-2xl font-semibold mb-4">Личный кабинет</h1>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-4">
            <div className="text-gray-700">
              Это заглушка страницы аккаунта. 
              Здесь позже будет:
              <ul className="list-disc ml-6 mt-2">
                <li>данные пользователя</li>
                <li>профиль владельца / врача</li>
                <li>список питомцев</li>
                <li>история консультаций</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </PullToRefresh>
    </div>
  );
}
