import { getProfile } from "@/features/profile/queries";

import { DeleteAccountCard } from "@/components/settings/delete-account-card";
import { PasswordCard } from "@/components/settings/password-card";
import { ProfileCard } from "@/components/settings/profile-card";
import { SupportCard } from "@/components/settings/support-card";

export default async function SettingsPage() {
  const profile = await getProfile();

  return (
    /* ULTRA-WIDE BOUNDARY CAP:
       - Upgraded from narrow max-w-4xl to wide max-w-[120rem] (1920px) to match the rest of your app.
       - Integrated responsive padding tokens for high-resolution scaling environments.
    */
    <div className="mx-auto w-full max-w-[120rem] space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8 2xl:p-12">
      <header className="space-y-1.5 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-slate-900 dark:text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Manage your profile, account security, support, and account preferences.
        </p>
      </header>

      {/* SIDE-BY-SIDE SIDEBAR TRACK PATTERN:
          - Automatically tiles components into 2 perfectly clean columns on desktops (xl) and ultra-wides (2xl).
          - Organizes core credentials on one side, and supplementary preferences/actions on the other.
      */}
      <div className="grid items-start gap-6 md:gap-8 grid-cols-1 xl:grid-cols-2">
        
        {/* Left Column: Account Core Credentials */}
        <div className="space-y-6 md:space-y-8 min-w-0">
          <section id="profile" className="w-full">
            <ProfileCard
              name={profile?.name ?? ""}
              email={profile?.email ?? ""}
              avatar={profile?.avatar ?? ""}
            />
          </section>

          <section id="security" className="w-full">
            <PasswordCard />
          </section>
        </div>

        {/* Right Column: Preferences, Support & Danger Zone */}
        <div className="space-y-6 md:space-y-8 min-w-0">
          <section id="support" className="w-full">
            <SupportCard />
          </section>

          <section id="danger-zone" className="w-full">
            <DeleteAccountCard />
          </section>
        </div>

      </div>
    </div>
  );
}