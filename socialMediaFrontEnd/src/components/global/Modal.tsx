import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { closeModalFunction } from '../../redux/modalSlice';
import { useAppSMDispatch, useAppSMSelector } from '../../redux/hooks';
import AddingPost from '../post/AddingPost';
import PostModal from '../post/PostModal';

function Modal() {
  const dispatch = useAppSMDispatch();
  const modal = useAppSMSelector((state) => state.modal);
  function closeFunction() {
    dispatch(closeModalFunction());
  }

  if (modal && modal.isOpen) {
    return createPortal(
      <div className="fixed z-999 inset-0 min-h-screen w-screen bg-gray-300/50  flexCenter">
        <div className="relative h-[90%] w-[90%] flexCenter rounded-3xl">
          <button
            onClick={() => closeFunction()}
            className="absolute z-600 top-[5%] right-[2%] bg-gray-50 rounded-full p-1 hover:text-gray-950 text-gray-600 cursor-pointer"
          >
            <X />
          </button>
          <div className="w-full h-full flexCenter ">
            {modal.type == 'AddingPost' && <AddingPost />}
            {modal.type == 'Post' && modal.id && <PostModal id={modal.id} />}
          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}

export default Modal;
