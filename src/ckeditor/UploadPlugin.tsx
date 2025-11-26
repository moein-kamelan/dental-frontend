import type { Editor } from "ckeditor5";
import type { FileLoader } from "@ckeditor/ckeditor5-upload";
import MyUploadAdapter from "./MyUploadAdapter";

export function UploadPlugin(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (
    loader: FileLoader
  ) => {
    return new MyUploadAdapter(loader);
  };
}
