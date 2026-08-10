import { getProfile } from "@/features/profile/queries";

import { DeleteAccountCard } from "@/components/settings/delete-account-card";
import { PasswordCard } from "@/components/settings/password-card";
import { ProfileCard } from "@/components/settings/profile-card";
import { SupportCard } from "@/components/settings/support-card";
import { SubscriptionCard } from "@/components/settings/subscription-card";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";

export default async function SettingsPage() {
  const profile = await getProfile();

  const subscription =
    await getUserSubscription();

  return (
    <div className="mx-auto w-full max-w-[120rem] space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your profile, subscription,
          account security, support, and
          account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {/* Left */}
        <div className="min-w-0 space-y-6">
          <section id="profile">
            <ProfileCard
              name={profile?.name ?? ""}
              email={profile?.email ?? ""}
              avatar={profile?.avatar ?? ""}
            />
          </section>

          <section id="subscription">
            <SubscriptionCard
              plan={subscription.plan}
              status={subscription.status}
              expiresAt={subscription.expiresAt}
            />
          </section>

          <section id="security">
            <PasswordCard />
          </section>
        </div>

        {/* Right */}
        <div className="min-w-0 space-y-6">
          <section id="support">
            <SupportCard />
          </section>

          <section id="danger-zone">
            <DeleteAccountCard />
          </section>
        </div>
      </div>
    </div>
  );
}