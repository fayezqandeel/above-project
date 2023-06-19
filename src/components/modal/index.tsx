import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose
} from '@radix-ui/react-dialog';
import Button from '../button';
import { type ModalProps } from '../../types/components';

const Index = ({ children, footer, open, onOpenChange }: ModalProps): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className={
            `bg-black bg-opacity-50 w-screen h-screen
             data-[state=open]:animate-overlayShow fixed
             left-0 top-0 right-0 bottom-0`
          }
        />
        <DialogContent
          className={
            `bg-white border-cyan-800 border-4
              w-[96%] md:w-1/2 p-8 data-[state=open]:animate-contentShow
              fixed top-[50%] left-[50%]  translate-x-[-50%]
              translate-y-[-50%] shadow-lg rounded`
          }
        >
          <div className="relative">
            <DialogClose className="absolute right-[-2rem] top-[-2rem] md:right-[-1rem] md:top-[-1rem]">
              <Button link><X /></Button>
            </DialogClose>
            {children}
            {footer}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Index;
