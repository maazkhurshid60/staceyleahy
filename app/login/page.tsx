import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Client sign in"
      title={
        <>
          Welcome <em className="text-gold-600">back.</em>
        </>
      }
      intro="Your saved homes, valuations and conversations with Stacey, in one place."
    >
      {/* useSearchParams (for ?next=) needs a Suspense boundary under Cache Components */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
