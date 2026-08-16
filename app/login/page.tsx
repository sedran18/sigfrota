import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";
import CurvedDivider from "@/components/login/CurvedDiviser";

const Login = () => {
  return (
    <main className="relative grid min-h-dvh w-full grid-cols-1 overflow-x-hidden bg-[var(--background)] lg:grid-cols-[57%_43%]">
      
      <div className="relative flex h-[38vh] w-full flex-col items-center justify-center lg:hidden">
        <Image 
          src="/loginBackground.jpg" 
          alt="Background Mobile" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex justify-center px-4">
          <Image 
            src="/logo.png" 
            alt="Logo do Consórcio" 
            width={350} 
            height={120} 
            loading="eager"
            className="w-[220px] object-contain drop-shadow-md sm:w-[260px]"
          />
        </div>
      </div>

      <div className="relative hidden min-h-screen w-full flex-col items-center justify-center p-4 lg:flex">
        <Image 
          src="/loginBackground.jpg" 
          alt="Background Desktop" 
          fill
          priority
          sizes="57vw"
          className="object-cover object-center z-0"
        />
        <div className="absolute inset-0 z-10 bg-black/15" />

        <div className="relative z-20 flex w-full justify-center px-4">
          <Image 
            src="/logo.png" 
            alt="Logo do Consórcio" 
            width={350} 
            height={120} 
            loading="eager"
            className="w-[320px] object-contain drop-shadow-md lg:w-[380px]"
          />
        </div>
      </div>

      <CurvedDivider />

      <div className="relative z-20 flex w-full flex-1 flex-col items-center justify-center bg-[var(--background)] px-2 py-6 sm:px-8 lg:min-h-screen lg:p-12">
        
        <div className="my-auto flex w-full flex-col items-center justify-center">
          <div className="w-full max-w-[500px] lg:max-w-[580px]">
            <LoginForm />
          </div>
        </div>

      </div>

    </main>
  );
};

export default Login;