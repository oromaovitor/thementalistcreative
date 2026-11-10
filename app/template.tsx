import InkTransition from "@/components/InkTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InkTransition />
      {children}
    </>
  );
}
