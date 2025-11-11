OnlyVet — Review Modal Navigate Fix
===================================

Что исправлено:
- Модалка полного отзыва больше НЕ вызывает history.back()
- Закрытие по крестику, по клику на фон и по ESC — выполняет только onClose()
- Блокируется скролл body на время показа модалки

Файлы в архиве:
- components/ReviewFullModal.tsx  — замените у себя этим файлом

Важно проверить в components/Reviews.tsx:
----------------------------------------
Убедитесь, что вызов модалки выглядит так (только setFull(null), без навигации):

{full && (
  <ReviewFullModal
    name={full.name}
    pet={full.pet}
    rating={full.rating}
    text={full.text}
    photo={full.photo}
    onClose={() => setFull(null)}   // <-- только закрыть состояние
  />
)}

Также убедитесь, что внутри модалки нет ссылок <a href="#"> и Link на закрытие.
Если где-то есть router.back() / history.back() — удалите их.
