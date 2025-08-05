"use client";

import { ReactNode, useState } from "react";
import { Navbar } from "@/components/general/Navbar";
import { NavbarModal } from "@/components/modals/NavbarModal";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Navbar onClick={() => setShowModal(true)} />
      {children}
      <NavbarModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default MainLayout;
