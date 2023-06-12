import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';

const AddDataModal = ({ isOpenAdding, onClose }) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <Dialog open={isOpenAdding} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>
              <div className="flex justify-between p-2">
                <span> افزودن / ویرایش کالا </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  onClick={onClose}
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </div>
            </Dialog.Title>
            <form className="p-2">
              <div className="my-4">
                <label> نام کالا </label>
                <input
                  className="border-1 rounded bg-teal-50 p-2"
                  type="text"
                ></input>
              </div>
              <div className="my-4">
                <label> دسته بندی </label>
                <select>
                  <option> adff </option>
                  <option> aref </option>
                </select>
              </div>
              <div className="my-4">
                <label> تصویر کالا </label>
                <input type="file"></input>
              </div>
              <div>{JSON.stringify(data)}</div>
            </form>
            <div className="flex justify-center gap-4">
              <button className="mb-3 p-3 rounded bg-teal-400" type="submit">
                افزودن
              </button>
              <button className="mb-3 p-3 rounded bg-red-400" onClick={onClose}>
                انصراف
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default AddDataModal;
