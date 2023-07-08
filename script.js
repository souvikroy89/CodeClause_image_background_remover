window.addEventListener('DOMContentLoaded', (event) => {
    const uploadInput = document.getElementById('upload');
    const previewImage = document.getElementById('preview-image');
    const removeBackgroundButton = document.getElementById('remove-background');
    const downloadLink = document.getElementById('download-link');
  
    let modifiedImageUrl = null;
  
    uploadInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function (event) {
        previewImage.src = event.target.result;
      }
  
      reader.readAsDataURL(file);
    });
  
    removeBackgroundButton.addEventListener('click', () => {
      if (!previewImage.src) {
        alert('Please upload an image first.');
        return;
      }
  
      removeBackgroundButton.disabled = true;
      removeBackgroundButton.textContent = 'Removing...';
  
      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'W5yfJJ3864AWomNdzFhXkDDQ',
        },
        body: createFormData(),
      })
        .then(response => response.blob())
        .then(blob => {
          modifiedImageUrl = URL.createObjectURL(blob);
          previewImage.src = modifiedImageUrl;
  
          downloadLink.style.display = 'inline-block';
          downloadLink.href = modifiedImageUrl;
  
          removeBackgroundButton.disabled = false;
          removeBackgroundButton.textContent = 'Remove Background';
        })
        .catch(error => {
          console.error('Error:', error);
          removeBackgroundButton.disabled = false;
          removeBackgroundButton.textContent = 'Remove Background';
        });
    });
  
    function createFormData() {
      const formData = new FormData();
      formData.append('image_file', uploadInput.files[0]);
      formData.append('size', 'auto');
      return formData;
    }
  });