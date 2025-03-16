// Define the URL of the endpoint
const url = 'https://postman-echo.com/post';

// Your Bearer token
const token = 'mindgrapes';

// Create a FormData object to hold the data
const formData = new FormData();

// Create a fake File object
const txtFile = new File(
  ['This is the content of the fake file.'], // An array of strings or other data
  'output.txt', // The name of the file
  { type: 'text/plain' }, // The MIME type of the file
);

const videoFile = new File(
  ['Some video file'], // An array of strings or other data
  'video.mp4', // The name of the file
  { type: 'video/mp4' }, // The MIME type of the file
);

const pdfFile = new File(
  ['Some pdf file'], // An array of strings or other data
  'document.pdf', // The name of the file
  { type: 'application/pdf' }, // The MIME type of the file
);

formData.append('user', '1');
formData.append('file_1', txtFile);
formData.append('file_2', videoFile);
formData.append('file_3', pdfFile);

// Function to pretty print JSON
function prettyPrintJson(jsonData) {
  return JSON.stringify(jsonData, null, 4);
}

// Make the POST request using fetch
fetch(url, {
  method: 'POST',
  body: formData,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json().then((jsonData) => {
        console.log('Request successful');
        console.log('Response JSON:');
        console.log(prettyPrintJson(jsonData));
      });
    } else {
      return response.text().then((text) => {
        console.log('Request failed with status code:', response.status);
        console.log('Response text:', text);
      });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
