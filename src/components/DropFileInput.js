import React, { useRef, useState } from 'react';
import './dropFile.css';
import uploadFilesToBackend from '../components/uploadFilesToBackend';
import uploadCloudImg from '../assets/cloudupload.png';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'video/mp4',
  'application/pdf',
  'image/vnd.adobe.photoshop',
  'application/postscript',
  'application/msword',
  'application/vnd.ms-powerpoint',
];

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Drag event handling
  const onDragEnter = (event) => {
    event.preventDefault();
    wrapperRef.current.classList.add('dragover');
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    wrapperRef.current.classList.remove('dragover');
  };

  const onDrop = (event) => {
    event.preventDefault();
    wrapperRef.current.classList.remove('dragover');

    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Add files function
  const handleFiles = (newFiles) => {
    let validFiles = newFiles.filter((file) =>
      ALLOWED_FILE_TYPES.includes(file.type),
    );

    if (validFiles.length === 0) {
      setErrorMessage('This is Not Allowed File Type.');
      return;
    }

    // Check the duplicate file or not
    validFiles = validFiles.filter(
      (newFile) =>
        !fileList.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size,
        ),
    );

    if (validFiles.length === 0) {
      setErrorMessage('Duplicate files cannot be uploaded.');
      return;
    }

    setErrorMessage('');
    const updatedList = [...fileList, ...validFiles];
    setFileList(updatedList);
    props.onFileChange(updatedList);

    // Uploading progress bar
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
      }
      setUploadProgress(progress);
    }, 500);
  };

  // Delete file function
  const fileRemove = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <div className="upload-form-container">
      <h2 className="form-name">Upload Hub</h2>
      <div
        ref={wrapperRef}
        className="drop-file"
        onDragEnter={onDragEnter}
        onDragOver={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="drop-file-box">
          <img src={uploadCloudImg} alt="Upload" />
          <p className="drop-file-box__label">
            {/* Underline just for text  */}
            Drag & drop files or&nbsp;
            <span className="browse-text">Browse</span>
          </p>
          <small className="drop-file-box__info">
            Allowed files: JPEG, JPG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </small>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          accept={ALLOWED_FILE_TYPES.join(',')}
          multiple // For dragging multiple files
          hidden
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="upload-progress">
          <p>
            {/* Show the progressing */}
            Uploading - {fileList.length}/{fileList.length} files
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {fileList.length > 0 && (
        <>
          <p className="drop-file-preview__text">Uploaded</p>
          <div className="drop-file-preview">
            {fileList.map((item, index) => (
              <div key={index} className="drop-file-preview__item">
                <p>{item.name}</p>
                <span
                  className="drop-file-preview__item__del"
                  onClick={() => fileRemove(item)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {fileList.length > 0 && (
        <button
          className="upload-button"
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '12px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={() => uploadFilesToBackend(fileList)}
        >
          UPLOAD FILES
        </button>
      )}
    </div>
  );
};

export default DropFileInput;
