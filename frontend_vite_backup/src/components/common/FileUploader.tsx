import React, { useRef, useState } from 'react';
import { Upload, FileText, FileCode, FileImage, FileAudio, FileVideo, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function FileUploader({ onFileSelect, isLoading = false }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const getFileIcon = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return <FileText className="h-8 w-8 text-red-400" />;
    if (['docx', 'doc'].includes(ext || '')) return <FileCode className="h-8 w-8 text-orange-600" />;
    if (['png', 'jpg', 'jpeg'].includes(ext || '')) return <FileImage className="h-8 w-8 text-emerald-600" />;
    if (['mp3', 'wav', 'ogg'].includes(ext || '')) return <FileAudio className="h-8 w-8 text-amber-600" />;
    if (['mp4', 'mkv', 'mov'].includes(ext || '')) return <FileVideo className="h-8 w-8 text-purple-400" />;
    return <FileText className="h-8 w-8 text-stone-600" />;
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.mp3,.wav,.mp4,.mkv"
        onChange={handleFileChange}
      />

      {!selectedFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            isDragOver
              ? 'border-orange-500 bg-orange-50/20'
              : 'border-stone-300 bg-stone-50/60 hover:border-stone-500 hover:bg-stone-50'
          }`}
        >
          <div className="p-3 rounded-full bg-stone-100 border border-stone-300 text-orange-600 mb-3">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
            Drag & Drop Intelligence Document or <span className="text-orange-600">Browse</span>
          </p>
          <p className="text-xs text-stone-600 mt-1">
            Supported Formats: PDF, DOCX, TXT, PNG, JPG, MP3, MP4 (Max 100MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 rounded-lg border border-stone-300 bg-stone-50">
          <div className="flex items-center space-x-3">
            {getFileIcon(selectedFile)}
            <div>
              <p className="text-sm font-semibold text-stone-900">{selectedFile.name}</p>
              <p className="text-xs text-stone-600">{formatBytes(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoading}
            onClick={() => {
              setSelectedFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
