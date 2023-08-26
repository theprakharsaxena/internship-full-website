import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the editor's styles

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      [{ color: [] }, { background: [] }], // Add color and background color options
    ],
  };

  return (
    <div className="content w-full">
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
