import DriverCard from "@/components/DriverCard";

export default function DriverPage({ params }: { params: { id: number } }) {
  return <DriverCard driverId={params.id} />;
}
