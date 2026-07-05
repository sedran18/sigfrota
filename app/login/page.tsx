import LoginForm from "@/components/login/LoginForm";
import Image from "next/image";
import  CurvedDivider  from "@/components/login/CurvedDiviser";

const Login = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[57%_43%] min-h-screen w-full relative overflow-hidden">
      
      <div className="relative flex flex-col items-center justify-center p-2 min-h-[40vh] md:min-h-screen">
        <Image 
          src="/loginBackground.jpg" 
          alt="Background" 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 57vw"
          className="object-cover object-center z-0"
        />
        {/* Overlay  */}
        {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}

        <div className="relative z-20 w-full flex justify-center">
          <Image 
            src="/logo.png" 
            alt="Logo do Consórcio" 
            width={250} 
            height={100} 
            loading="eager"
            className="object-contain md:w-200"
          />
        </div>
      </div>

      {/* <div className="hidden md:block absolute 
            top-0 bottom-0 left-[55%] 
            -translate-x-1/2 z-20 pointer-events-none">
        <div className="h-full w-[120px] bg-[var(--background)] 
            border-l-[20px] border-green-700 rounded-l-[100%_50%] border-r-0 
            scale-y-110" />
      </div> */}

      <CurvedDivider />

      <div className="flex items-center justify-center 
        p-8 md:p-16 z-20 bg-[var(--background)] min-h-[60vh] md:min-h-screen">
        <div className="w-full max-w-[500px]">
          <LoginForm />
        </div>
      </div>

    </main>
  );
};

export default Login;