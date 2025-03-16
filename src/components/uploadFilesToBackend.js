const uploadFilesToBackend = async (fileList) => {
  const formData = new FormData();
  formData.append('user', 1);

  fileList.forEach((file, index) => {
    formData.append(`file_${index + 1}`, file);
  });

  try {
    const response = await fetch('https://postman-echo.com/post', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer mindgrapes',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Upload Failed:', error);
  }
};

export default uploadFilesToBackend;
