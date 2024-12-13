import React from "react";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { useSelector } from "react-redux";
import { HiOutlineUser, HiOutlineCog } from "react-icons/hi";
import { FiActivity } from "react-icons/fi";
import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
const dropdownItemList = [
  {
    label: "Profile",
    path: "/app/account/settings/profile",
    icon: <HiOutlineUser />,
  },
  {
    label: "Account Setting",
    path: "/app/account/settings/profile",
    icon: <HiOutlineCog />,
  },
  {
    label: "Activity Log",
    path: "/app/account/activity-log",
    icon: <FiActivity />,
  },
];

export const UserDropdown = ({ className }) => {
  const { avatar, userName, authority, email } = useSelector(
    (state) => state.auth.user
  );
  const { signOut } = useClerk();
  const { signOut: local } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(); // Cierra sesión en Clerk
      await local();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <div>
      <UserButton />
    </div>
  );
};

export default withHeaderItem(UserDropdown);
