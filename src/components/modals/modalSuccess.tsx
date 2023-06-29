import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';

function MyDialog({ isOpen, setIsOpen }) {
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
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-lime-500">
          <Dialog.Title className="p-4 text-center text-rose-700 font-bold">
            با تشکر از خرید شما
          </Dialog.Title>

          <Dialog.Description className=" py-5 p-4 text-center">
            <p>
              سپاس از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
              تماس گرفته خواهد شد
            </p>
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
export default MyDialog;
