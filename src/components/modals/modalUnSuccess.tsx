import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';

function UnsuccessModal({ isOpenModal, setIsOpenModal }) {
  const onClose = () => {
    setIsOpenModal(false);
  };
  return (
    <Dialog
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-lime-500">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 512 512"
              className="fill-green-800 p-4"
              onClick={onClose}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </div>
          <Dialog.Title className="p-4 text-center text-rose-700 font-bold">
            پرداخت ناموفق
          </Dialog.Title>

          <Dialog.Description className=" py-5 p-4 text-center">
            <p>پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است</p>
          </Dialog.Description>
          <div className="mt-4 flex justify-center items-center">
            <Link href="/">
              <button className="mr-2 mb-4 px-4 py-2 bg-green-500 text-white rounded">
                بازگشت به سایت
              </button>
            </Link>
            {/* <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 rounded"
            >
              خیر
            </button> */}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default UnsuccessModal;
