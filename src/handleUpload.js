const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
      const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
      });
      const data = await response.text();
      console.log(data);
  } catch (error) {
      console.error("There was an error uploading the file!", error);
  }
};

return (
  <div>
      <FileInput text="Choose a file..." onInputChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
  </div>
);
