const uploadFilesToBackend = async (fileList) => {
  // console.log("📂 Uploading Files:", fileList);
  // fileList.forEach((file, index) => {
  //   console.log(`📎 File ${index + 1}:`, file.name, file.type, file.size);
  // });

  // Create FormData to send files along with user ID
  const formData = new FormData();
  formData.append('user', 1);

  // Append each file to FormData with a unique key
  fileList.forEach((file, index) => {
    formData.append(`file_${index + 1}`, file);
  });

  try {
    // Sending POST request to the backend
    const response = await fetch('https://postman-echo.com/post', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer mindgrapes',
      },
      body: formData,
    });

    if (!response.ok) {
      // Check for response errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    // Handle any errors during file upload
    console.error('Upload Failed:', error);
  }
};

export default uploadFilesToBackend;
