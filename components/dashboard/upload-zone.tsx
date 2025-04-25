"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Loader2 } from "lucide-react"

interface UploadZoneProps {
  onFileUpload: (file: File) => void
  isUploading?: boolean
}

export function UploadZone({ onFileUpload, isUploading = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Process the first file only
    const file = files[0]
    onFileUpload(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*,.pdf,.csv,.xlsx,.xls,.pptx,.ppt"
        className="hidden"
      />

      <div className="flex flex-col items-center gap-2">
        {isUploading ? (
          <>
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm font-medium">Uploading...</p>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-slate-400" />
            <p className="text-sm font-medium">Drag & drop your dashboard or click to browse</p>
            <p className="text-xs text-slate-500">
              Supports images (PNG, JPG), PDF, Excel (XLSX, XLS), and PowerPoint (PPTX, PPT)
            </p>
          </>
        )}
      </div>
    </div>
  )
}
