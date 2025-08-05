import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  useDefaultStyle?: boolean;
  backgroundContainerClassName?: string;
  containerClassName?: string;
}

export const ModalLayout = ({
  isOpen,
  onClose,
  children,
  useDefaultStyle = true,
  backgroundContainerClassName = "",
  containerClassName = "",
}: ModalLayoutProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className={clsx(
            "fixed inset-0 z-50 flex justify-center items-center",
            useDefaultStyle &&
              "backdrop-filter backdrop-brightness-90 backdrop-blur-sm",
            backgroundContainerClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={containerClassName}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
