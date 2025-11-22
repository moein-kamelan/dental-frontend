/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=docs#installation/NoNgNARATAdAHDKFIHYUEZ1wAwGYtxRTbq4oggAs6FArCCoXJXAJxw1xzIQCmAdsmxhg6MGIlhh6ALqQARgBMAhtmyLcEGUA
 */
import "./TextEditor.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Autoformat,
  TextTransformation,
  LinkImage,
  Link,
  ImageBlock,
  ImageToolbar,
  BlockQuote,
  Bold,
  Table,
  TableToolbar,
  Heading,
  ImageTextAlternative,
  ImageCaption,
  ImageStyle,
  Indent,
  IndentBlock,
  ImageInline,
  Italic,
  List,
  MediaEmbed,
  TableCaption,
  TodoList,
  Underline,
  Mention,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Strikethrough,
  Alignment,
  HorizontalLine,
  CodeBlock,
  ImageInsertViaUrl,
  AutoImage,
  ImageUpload,
  CloudServices,
  ShowBlocks,
  SourceEditing,
  BalloonToolbar,
  BlockToolbar,
  type EditorConfig,
  type Editor,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjQ4MDYzOTksImp0aSI6IjVhZDE2Y2JiLWI5NDgtNDJlYS1iMjJmLTI2ODUyMmU1MzVkZSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImQzMzI3ZWE4In0.4BUWU3IwZTkHewgs77Aq2-_2O-dC2QL8NnOUIKoMPkmRstoGNnDcY8QTq87nNDLE_5xKksrM5jLXNRD0QfQB8g";

interface TextEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  labelText?: string;
  errorMessage?: string | null;
  optional?: boolean;
}

export default function TextEditor({
  value = "",
  onChange,
  placeholder = "متن خود را اینجا تایپ یا جایگذاری کنید!",
  labelText,
  errorMessage,
  optional,
}: TextEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  // Sync value with editor when value prop changes externally
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentData = editorRef.current.getData();
      if (currentData !== value) {
        editorRef.current.setData(value || "");
      }
    }
  }, [value]);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditing",
            "showBlocks",
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "horizontalLine",
            "link",
            "mediaEmbed",
            "insertTable",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          CloudServices,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Heading,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsertViaUrl,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          MediaEmbed,
          Mention,
          Paragraph,
          ShowBlocks,
          SourceEditing,
          Strikethrough,
          Table,
          TableCaption,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        blockToolbar: [
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "|",
          "bulletedList",
          "numberedList",
          "outdent",
          "indent",
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
          ],
        },
        initialData: value || "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        placeholder: placeholder,
        language: "fa",
        direction: "rtl",
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
      },
    };
  }, [isLayoutReady, placeholder, value]);

  return (
    <div className="col-span-full">
      {labelText && (
        <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
          <span className="block mr-4 mb-2">
            {labelText}
            {optional && <span className="text-paragray"> (اختیاری)</span>}
          </span>
        </label>
      )}
      <div className="main-container text-editor-rtl">
        <div
          className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig as EditorConfig}
                data={value || ""}
                onReady={(editor) => {
                  editorRef.current = editor;
                  // Set initial data
                  if (value) {
                    editor.setData(value);
                  }
                }}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  onChange?.(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {errorMessage && (
        <span className="block text-red-500 text-[10px] font-iran-sans-normal mr-4 mb-2 h-4">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
