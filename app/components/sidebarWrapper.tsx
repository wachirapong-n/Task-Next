"use client";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/app/components/sidebar"), {
  ssr: false,
});

export default Sidebar;