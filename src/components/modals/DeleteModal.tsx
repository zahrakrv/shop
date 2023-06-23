import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const DeleteModal = ({ isOpen, onClose, onConfirmDelete }) => {
  // let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen ? true : false}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-8">
          <Dialog.Title>از حذف این محصول مطمئن هستید؟</Dialog.Title>
          <Dialog.Description className="text-red-500 py-5">
            این عملیات غیرقابل بازگشت است!
          </Dialog.Description>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => onConfirmDelete(isOpen)}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 rounded"
            >
              خیر
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
