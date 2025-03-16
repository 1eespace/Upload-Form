const uploadFilesToBackend = async (fileList) => {
  // console.log("📂 Uploading Files:", fileList);
  // fileList.forEach((file, index) => {
  //   console.log(`📎 File ${index + 1}:`, file.name, file.type, file.size);
  // });

  const formData = new FormData();
  formData.append('user', 1);

  fileList.forEach((file, index) => {
    formData.append(`file_${index + 1}`, file);
  });

  try {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://postman-echo.com/post',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer mindgrapes',
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Upload Response:', result);
  } catch (error) {
    console.error('Upload Failed:', error);
  }
};

export default uploadFilesToBackend;
