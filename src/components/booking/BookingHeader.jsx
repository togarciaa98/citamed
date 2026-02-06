import Avatar from "@/components/ui/Avatar";
import { MapPinIcon } from "@/components/ui/Icons";

export default function BookingHeader({ doctor }) {
  return (
    <div className="bg-white border-b border-border px-5 pt-8 pb-6">
      <div className="max-w-lg mx-auto flex flex-col items-center text-center">
        <Avatar name={doctor.name} imageUrl={doctor.avatar_url} size="xl" />
        <h1 className="font-semibold text-xl text-dark mt-4">
          {doctor.name}
        </h1>
        <p className="text-gray text-sm mt-0.5">{doctor.specialty}</p>
        {doctor.address && (
          <p className="text-muted text-xs mt-2 flex items-center gap-1">
            <MapPinIcon size={14} />
            {doctor.address}
          </p>
        )}
      </div>
    </div>
  );
}
