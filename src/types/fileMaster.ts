export interface FileRelation {
  id: number
  relatedId: number
  relatedCode: string
}

export interface FileMaster {
  id: number
  fileUrl: string
  fileName: string
  fileOriginalName: string
  fileType: string
  fileSize: number
  publicId: string
}

export interface UploadFileRequest {
  id: number
  file: File
}

export interface DeleteFileRequest {
  url: string
}

export interface DeleteFileByIdRequest {
  id: number
}
