"use client";

import { useEffect } from "react";
import { AttributionFooter } from "@/components/AttributionFooter";
import { usePageContext } from 'vike-react/usePageContext';

const Page = () => {
  const pageContext = usePageContext();
  useEffect(() => {
    console.error("Error:", pageContext.urlPathname);
  }, [pageContext.urlPathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/">Return to Home</a>
        </div>
      </div>
      <AttributionFooter />
    </div>
  );
};

export default Page;