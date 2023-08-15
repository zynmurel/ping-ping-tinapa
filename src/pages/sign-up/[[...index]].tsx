import { SignUp } from "@clerk/nextjs";
import ClerkComponentLayout from "../components/clerkComponentsLayout";

export default function Page() {
  return (
    <ClerkComponentLayout>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </ClerkComponentLayout>
  );
}
