import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const CheckingOrder = ({ isOpen, onClose }) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title> نمایش سفارش </Dialog.Title>
          {/* <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description> */}

          <div>
            <span>نام مشتری:</span>
            <span>نمونه</span>
          </div>
          <div>
            <span> آدرس: </span>
            <span> نمونه آدرس </span>
          </div>

          <div>
            <span> تلفن: </span>
            <span> 09123336655 </span>
          </div>

          <div>
            <span> زمان تحویل: </span>
            <span> ...... </span>
          </div>

          <div>
            <span> زمان سفارش: </span>
            <span> ..... </span>
          </div>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CheckingOrder;
