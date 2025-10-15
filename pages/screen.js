import dynamic from "next/dynamic";

const ScreenDisplay = dynamic(() => import("@/components/screen"), {
  ssr: false,
});

export default function ScreenPage() {
  return <ScreenDisplay />;
}


