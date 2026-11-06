import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Reset password"
      title={
        <>
          It happens to <em className="text-gold-600">everyone.</em>
        </>
      }
      intro="Enter the email you signed up with and we'll send you a link to choose a new password."
    >
      <ForgotForm />
    </AuthShell>
  );
}
