import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Button, Modal, Select } from "flowbite-react";

type Props = {
  children: ReactNode;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function ModalComponent({
  openModal,
  setOpenModal,
  children,
}: Props) {
  return (
    <Modal show={openModal} size={"md"} onClose={() => setOpenModal(false)}>
      {children}
    </Modal>
  );
}
