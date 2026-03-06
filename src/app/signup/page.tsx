import { cookies } from "next/headers";
import { SignupForm } from "./SignupForm";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
        redirect("/dashboard");
    }
    return (
        <SignupForm/>
    )
}