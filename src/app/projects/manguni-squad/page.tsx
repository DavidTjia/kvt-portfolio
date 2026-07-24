import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailBody } from "@/components/projectDetail/ProjectDetailBody";
import { getProjectDetail } from "@/data/projectDetails";

const detail = getProjectDetail("manguni-squad");

export const metadata: Metadata = {
  title: "Manguni Squad — KVT Portfolio",
  description:
    "Manguni Squad — FPS mobile bertema warisan Indonesia buatan Kawanua Virtual Teknologi.",
};

export default function ManguniSquadPage() {
  if (!detail) notFound();
  return <ProjectDetailBody detail={detail} />;
}
