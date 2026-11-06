import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Create an account"
      title={
        <>
          Your search, <em className="text-gold-600">remembered.</em>
        </>
      }
      intro="Save homes, follow neighborhoods and keep every conversation with Stacey together."
    >
      <Suspense>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
