// components/ImageUploader.tsx
'use client';
import { useRef, useState } from 'react';

export default function ImageUploader(){
  const inputRef = useRef<HTMLInputElement|null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const onPick = () => inputRef.current?.click();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(f => {
      const reader = new FileReader();
      reader.onload = ev => setPreviews(p => [...p, String(ev.target?.result || '')]);
      reader.readAsDataURL(f);
    });
    e.currentTarget.value = '';
  };

  return (
    <div className="card">
      <div className="text-sm opacity-80 mb-2">Добавьте изображения (локальный предпросмотр)</div>
      <div className="flex gap-2 flex-wrap mb-2">
        {previews.map((src, i) => (
          <img key={i} src={src} alt={'preview-'+i} className="w-28 h-28 object-cover rounded-xl border" />
        ))}
      </div>
      <button className="btn bg-white border border-gray-300 rounded-xl px-4" onClick={onPick}>Добавить изображения</button>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onChange} />
      <div className="text-xs opacity-60 mt-2">⚠️ Предпросмотр без загрузки: для сохранения на сервере нужен backend/API (добавлю по команде).</div>
    </div>
  );
}
