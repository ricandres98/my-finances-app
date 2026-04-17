import { VerificationCodeForm } from "@/components/signup/VerificationCodeForm";
import { verificationService } from "@/services/verification.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ vid: string }>
}

export default async function SignupPage({ searchParams }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const { vid } = await searchParams;
  
  const email = await verificationService.findEmailByTokenId(Number(vid));

  if (token) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-slate-50 px-4 min-h-screen flex flex-col items-center">
      <div className="mt-12 mb-10 flex flex-col items-center">
				<h2 className="text-lg text-slate-500">
          ¡Solo un paso más!
        </h2>
				<h1 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center">
					Verifica tu email
				</h1>
			</div>
      <div>
        <VerificationCodeForm  email={email}/>
      </div>
    </div>
  )
}