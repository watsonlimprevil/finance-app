import { Outlet } from "react-router-dom";
import OnboardingModal from "./OnboardModal";

export default function LayoutOnboard() {
  return (
    <>
      <Outlet />
      <OnboardingModal />
    </>
  );
}
