export default function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  const full = Math.round(value);
  return (
    <div className="inline-flex items-center gap-1">
      {[0,1,2,3,4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < full ? '#F7765C' : '#E5E7EB'} aria-hidden>
          <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}
