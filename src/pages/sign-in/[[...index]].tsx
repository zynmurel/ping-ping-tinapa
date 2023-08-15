import { SignIn, UserButton } from "@clerk/nextjs";
import ClerkComponentLayout from "../components/clerkComponentsLayout";

const SignInPage = () => {
  return (
    <ClerkComponentLayout>
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/user"
      />
    </ClerkComponentLayout>
  );
};

export default SignInPage;
