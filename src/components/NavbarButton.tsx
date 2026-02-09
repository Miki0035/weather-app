import React, { type ReactNode } from "react";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className: string;
}

const NavbarButton = ({ onClick, children, className }: Props) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default NavbarButton;
