import ProfileComponent from "@/components/dashboard/ProfileComponent";

export default async function ProfileIdPage({ params }) {
  const { profileId } = await params;

  return (
    <div className="w-full">
      <ProfileComponent profileId={profileId} role={'patient'} />
    </div>
  );
}
