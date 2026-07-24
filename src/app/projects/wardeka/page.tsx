import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailBody } from "@/components/projectDetail/ProjectDetailBody";
import { getProjectDetail } from "@/data/projectDetails";

const detail = getProjectDetail("wardeka");

export const metadata: Metadata = {
  title: "Wardeka Edonisia — KVT Portfolio",
  description:
    "Wardeka Edonisia — eSports shooter buatan Kawanua Virtual Teknologi, ditenagai infrastruktur cloud Delta Garuda.",
};

export default function WardekaPage() {
  if (!detail) notFound();
  return <ProjectDetailBody detail={detail} />;
}
