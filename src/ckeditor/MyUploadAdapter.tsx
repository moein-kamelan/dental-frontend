import type { FileLoader } from "@ckeditor/ckeditor5-upload";

export default class MyUploadAdapter {
  private loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then((file: File | null) => {
      if (!file) {
        return Promise.reject(new Error("File is null"));
      }

      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("file", file);

        fetch("/api/upload", {
          method: "POST",
          body: data,
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Upload failed: ${res.statusText}`);
            }
            return res.json();
          })
          .then((response: { url: string }) => {
            resolve({
              default: response.url,
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  abort(): void {
    // Optional: implement abort logic
  }
}
