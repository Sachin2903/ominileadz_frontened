import {
  Footer,
  Hero1,
  Hero2,
  Hero3,
  Hero4,
  Hero5,
  Hero6,
  Hero7,
  Hero8,
} from "@/components/LandingPages";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <main className="h-auto">
        <Hero1 />
        <Hero2 />
        <Hero3 />
        <Hero4 />
        <Hero5 />
        <Hero6 />
        <Hero7 />
        <Hero8 />
        <Footer />
      </main>
    </>
  );
};

export default Page;
