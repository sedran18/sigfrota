'use client'

const CurvedDivider = () =>  {
  return (
    <div 
      className="
        hidden md:block absolute top-0 bottom-0 
        left-[54%] -translate-x-1/2 h-full w-32 z-30 pointer-events-none
      "
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 120 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M120 0 
             C20 250, 100 750, 120 1000 
             L120 0 Z"
          fill="#F8FAFC"
        />

        <path
          d="M120 0 
             C20 250, 100 750, 120 1000 
             L95 1000 
             C50 700, -60 300, 95 0 Z"
          fill="#155314" 
        />
      </svg>
    </div>
  );
}

export default CurvedDivider;