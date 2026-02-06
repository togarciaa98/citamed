export default function BookingHeader({ doctor }) {
  return (
    <div className="bg-primary px-5 pt-8 pb-12 text-center relative overflow-hidden">
      <div className="absolute -top-15 -right-15 w-50 h-50 rounded-full bg-white/[0.06]" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04]" />
      <div className="relative z-1">
        <div className="w-[72px] h-[72px] rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4 text-[28px]">
          🦷
        </div>
        <h1 className="font-display text-2xl text-white mb-1">
          {doctor.name}
        </h1>
        <p className="text-white/80 text-sm mb-1">{doctor.specialty}</p>
        <p className="text-white/60 text-[13px]">{doctor.address}</p>
      </div>
    </div>
  );
}
