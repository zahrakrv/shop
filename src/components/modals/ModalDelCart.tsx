import { useState } from 'react';
import { Dialog } from '@headlessui/react';

function ModalDelCart({ isModalOpen, setIsModalOpen, removeFromCart }) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white flex flex-col items-center">
          <Dialog.Title className="font-bold p-4">
            حذف کالا از سبد خرید
          </Dialog.Title>

          <p className=" p-4">آیا از حذف این کالا از سبد خرید مطمئن هستید؟</p>
          <div className="p-4">
            <button
              className="bg-green-500 text-white rounded p-2"
              onClick={() => {
                removeFromCart(isModalOpen);
                setIsModalOpen(false);
              }}
            >
              بله
            </button>
            <button
              className="bg-red-500 text-white rounded p-2"
              onClick={() => setIsModalOpen(false)}
            >
              خیر
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default ModalDelCart;
