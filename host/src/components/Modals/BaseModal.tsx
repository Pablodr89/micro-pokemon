import type { ReactNode } from "react";

export const BaseModal = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="animate-in bg-modal fixed top-5 lg:top-8 left-0 z-60 flex h-full w-full flex-col items-center justify-center overflow-auto"
      id="modal"
    >
      <section
        className={`relative z-10 flex flex-col items-start justify-start rounded-2xl w-[90%] bg-white shadow-lg max-w-2xl`}
      >
        {children}
      </section>
    </div>
  );
};
