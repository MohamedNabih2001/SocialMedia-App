import { forwardRef, type InputHTMLAttributes, type ForwardedRef } from 'react';
type PropsType = InputHTMLAttributes<HTMLTextAreaElement> & {
  type?: string;
  id: string;
  colsNumber?: number;
  rowsNumber?: number;
};
const TextArea = forwardRef(
  (
    { id, colsNumber = 5, rowsNumber = 5, ...props }: PropsType,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className="w-full relative">
        <textarea
          {...props}
          ref={ref}
          cols={colsNumber}
          rows={rowsNumber}
          placeholder={`What do you think . . . . . . . . . ?`}
          className="w-full peer  p-2 border-l-2 border-b-2 border-gray-400 placeholder:text-gray-400 focus:border-gray-800 focus:outline-0 focus:placeholder:text-transparent"
        />
      </div>
    );
  }
);

export default TextArea;
