import ProfileCard from "./ProfileCard";
import SideNav from "./SideNav";
import Logo from "./Logo";

export default function LeftMenu() {
  return (
    <>
      {/* twitter logo */}
      <Logo />
      <SideNav />
      <ProfileCard />
    </>
  );
}
