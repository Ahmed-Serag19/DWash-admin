import React from "react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  console.log(title);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold text-blue-950 mb-3">{title}</h2>
        <p className="text-gray-700 mb-5">{description}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={onConfirm}
            className={`${
              title === "Activate User" ? "text-green-500" : "text-red-500"
            }`}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
