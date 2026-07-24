import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailBody } from "@/components/projectDetail/ProjectDetailBody";
import { getProjectDetail } from "@/data/projectDetails";

const detail = getProjectDetail("nusa-space");

export const metadata: Metadata = {
  title: "Nusa Space — KVT Portfolio",
  description:
    "Nusa Space — simulasi edukasi 3D eksplorasi antariksa untuk PC & VR buatan Kawanua Virtual Teknologi.",
};

export default function NusaSpacePage() {
  if (!detail) notFound();
  return <ProjectDetailBody detail={detail} />;
}
