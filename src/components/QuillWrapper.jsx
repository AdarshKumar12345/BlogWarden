// components/QuillWrapper.jsx
"use client";

import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillWrapper = forwardRef((props, ref) => {
  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    getEditor: () => localRef.current?.getEditor?.(),
  }));

  return <ReactQuill {...props} ref={localRef} />;
});

QuillWrapper.displayName = "QuillWrapper";
export default QuillWrapper;
