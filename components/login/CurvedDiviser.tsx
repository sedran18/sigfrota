'use client'

const CurvedDivider = () => {
  return (
    <div 
      className="
        hidden lg:block absolute top-0 bottom-0 
        left-[57%] -translate-x-[120px]
        h-full w-32 z-30 pointer-events-none
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
             L95 1000 
             C50 700, -60 300, 95 0 Z"
          fill="#065f46" 
        />

        <path
          d="M120 0 
             C20 250, 100 750, 120 1000 
             L120 0 Z"
          fill="var(--background, #ffffff)"
        />
      </svg>
    </div>
  );
}

export default CurvedDivider;