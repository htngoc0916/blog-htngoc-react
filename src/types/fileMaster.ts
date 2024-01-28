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

export interface UploadRequest {
  id: number
  file: File
  navigate: (to: string) => void
}

export interface DeleteUploadRequest {
  url: string
  navigate: (to: string) => void
}

export interface DeleteUploadByIdRequest {
  id: number
  navigate: (to: string) => void
}
