import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MdCloudUpload, MdInsertDriveFile, MdClose, MdCheckCircleOutline } from 'react-icons/md';

export const ResumeUploader = ({
  file,
  setFile,
  parsing,
  parsedText,
  onParseComplete,
  onError
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    // Check file type
    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    if (fileType !== 'pdf' && fileType !== 'docx') {
      onError('Unsupported file type. Please upload a PDF or DOCX file.');
      return;
    }

    // Check file size (10 MB = 10 * 1024 * 1024 bytes)
    if (selectedFile.size > 10 * 1024 * 1024) {
      onError('File exceeds the 10 MB size limit.');
      return;
    }

    setFile(selectedFile);
    onParseComplete(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 dark:bg-primary/5 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-white/40 dark:bg-slate-900/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleChange}
        />

        {!file ? (
          <div className="space-y-4 py-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 dark:bg-primary/5 text-primary rounded-2xl flex items-center justify-center animate-pulse">
              <MdCloudUpload className="text-3xl" />
            </div>
            <div>
              <button
                type="button"
                onClick={onButtonClick}
                className="font-bold text-sm text-primary hover:text-accent transition outline-none cursor-pointer"
              >
                Browse files
              </button>
              <span className="text-slate-500 dark:text-slate-400 text-sm"> or drag & drop your resume here</span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Supports PDF and DOCX formats (Max size: 10 MB)
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl gap-4"
          >
            <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
              <div className="p-3 bg-primary/20 dark:bg-primary/10 text-primary rounded-lg flex-shrink-0">
                <MdInsertDriveFile className="text-2xl" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[250px] sm:max-w-[320px]">
                  {file.name}
                </p>
                <p className="text-[11px] text-slate-450 dark:text-slate-400 font-semibold mt-0.5">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              {parsing && (
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                  <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Parsing...</span>
                </div>
              )}
              {parsedText && !parsing && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-100/40 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                  <MdCheckCircleOutline className="text-base" />
                  <span>Ready</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Remove file"
              >
                <MdClose className="text-lg" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
