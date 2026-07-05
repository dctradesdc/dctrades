"use client";

import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export function SocialLogin() {
  async function handleGoogleOAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="space-y-5">
      {/* Decorative Elegant Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/60" />
        </div>

        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-3 text-muted-foreground/80 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Premium Full-Width Google Authentication */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleOAuth}
        className="w-full h-11 rounded-xl border-border/80 bg-background/50 font-medium shadow-sm transition-all duration-300 hover:bg-muted hover:text-foreground focus-visible:ring-primary/20"
      >
        <FaGoogle className="mr-2.5 h-4 w-4 text-foreground/90" />
        Continue with Google
      </Button>
    </div>
  );
}