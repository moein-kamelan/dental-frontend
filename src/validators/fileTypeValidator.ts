
export const isValidFileType = (file: File): boolean => {
    const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf("."));
  
    return (
      allowedExtensions.includes(fileExtension) &&
      allowedMimeTypes.includes(file.type)
    );
  };
  