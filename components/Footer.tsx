export default function Footer() {
  return (
    <footer className="bg-navy text-white py-10 mt-20">
      <div className="container grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="text-lg font-semibold mb-2">OnlyVet</div>
          <p className="opacity-80">Мы рядом, даже когда врач далеко.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Документы</div>
          <ul className="space-y-1 opacity-90">
            <li><a href="#" aria-disabled>Пользовательское соглашение</a></li>
            <li><a href="#" aria-disabled>Политика конфиденциальности</a></li>
            <li><a href="#" aria-disabled>Согласие на обработку данных</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Контакты</div>
          <p>support@onlyvet.example</p>
          <p className="opacity-80 mt-2">© {new Date().getFullYear()} OnlyVet</p>
        </div>
      </div>
    </footer>
  );
}
