import { Toaster } from "sonner";

export default function Toast() {
  return (
    <Toaster
      richColors
      position="bottom-left"
      duration={2500}
      toastOptions={{ style: { padding: "15px", fontSize: "1.25rem" } }}
    />
  );
}
