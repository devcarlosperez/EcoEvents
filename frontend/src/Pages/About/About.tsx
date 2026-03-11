import { Title } from "../../Components/Title/title"


export function About() {
   
    return(
        <>
        <div className="min-h-dvh w-screen bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)]">
            
            <main>
                <div className="flex justify-center items-center ">
                <Title text="About Us" />
            </div>
            </main>
        </div> 
        </>
    )
}

export function About() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)]">

      {/* Palm background */}
      <img
        src={aboutBg}
        alt="Palm"
        className="pointer-events-none absolute right-0 top-0 h-full object-contain opacity-30"
      />

      <main className="relative z-10 mx-auto max-w-6xl px-6 ">

        {/* About */}
        <div className="flex justify-center ">
          <Title text="About Us" />
        </div>

        <div className="mx-auto max-w-2xl -skew-x-8 rounded-[28px] border border-[#8BCB8D] bg-[#F3FAF0]/30 shadow-lg backdrop-blur-md px-[14px] py-[14px] sm:px-10 sm:py-10 text-center">
          <p className="text-[20px] leading-8 text-[#1C241D]">
            EcoEvents is a community web application created to make it easier
            for people to take action and help protect the environment.
          </p>

          <p className="mt-2 md:mt-8 text-[20px] leading-8 text-[#1C241D]">
            Our mission is simple: connect individuals who care about the
            planet and give them the tools to organize and participate in
            meaningful environmental activities.
          </p>
        </div>

        {/* Nature Facts title */}
        <div className="flex justify-center ">
          <Title text="Nature Facts" />
        </div>

        {/* Facts cards */}
        <div className="grid gap-24 md:grid-cols-3 mb-19">
          <FactCard text="Healthy forests help fight climate change by absorbing carbon dioxide from the atmosphere and storing it in trees and soil." />

          <FactCard text="Small actions like joining local cleanups or reducing waste can collectively reduce environmental impact and support climate action." />

          <FactCard text="Protecting natural habitats helps preserve biodiversity which is essential for healthy ecosystems and human well-being." />
        </div>

      </main>
    </div>
  );
}