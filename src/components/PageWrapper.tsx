"use client";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./Footer";

const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear" }}
      >
        <main className=" p-8 md:p-24 md:py-8  ">{children}</main>
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}
