// Define an asynchronous function named 'imagebase64' that takes a 'file' as a parameter
const imagebase64 = async (file) => {
    // Create a new FileReader object to read the contents of the file
    const reader = new FileReader();
  
    // Asynchronously read the contents of the file as a Data URL
    await reader.readAsDataURL(file);
    
    // Create a Promise to handle the asynchronous result of reading the file
    const data = new Promise((resolve, reject) => {
      // Set up a callback for when the file reading is successful
      reader.onload = () => resolve(reader.result);
  
      // Set up a callback for when an error occurs during file reading
      reader.onerror = (err) => reject(err);
    });
  
    // Return the Promise representing the result of reading the file
    return data;
  };
  


 /**
 * Handles the selection of an image file and converts it into base64 format.
 * Restricts file types to PNG and JPG.
 *
 * @async
 * @function
 * @param {Event} e - The change event triggered when an image is selected.
 */
const handaluploadImage = async (e) => {
  const file = e.target.files[0];

  // Check if a file is selected and it is either a PNG or JPG image
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    // Convert the selected image file into a base64-encoded string using the imagebase64 function
    const image = await imagebase64(file);
    setImg(image);
  } else {
    // Display an alert or handle the case when an unsupported file type is selected
    alert("Please select a valid PNG or JPG image.");
    // Optionally, you can clear the input or handle the situation accordingly
    e.target.value = null;
  }
}



  /**
 * Fetches all images from the backend server using a GET request,
 * updates the state variable 'allimage' with the retrieved data,
 * and logs the result to the console.
 *
 * @async
 * @function
 */
const getImage = async () => {
  // Perform a GET request to fetch all images from the backend server
  let result = await fetch("http://localhost:6500/");

  // Parse the response as JSON
  result = await result.json();

  // Update the state variable 'allimage' with the retrieved image data
  setAllimage(result.data);

  // Log the result to the console for debugging or informational purposes
  console.log(result);
}



/**
 * Handles the form submission for image upload. Prevents the default form behavior,
 * checks if there is an image selected, sends a POST request to the backend server with
 * the base64-encoded image data, and updates state and triggers image retrieval if the
 * upload is successful.
 *
 * @async
 * @function
 * @param {Event} e - The form submission event.
 */
let handleSumit = async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Check if there is an image selected for upload
  if (img) {
    // Send a POST request to the backend server for image upload
    let result = await fetch("http://localhost:6500/upload", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      // Send the base64-encoded image data in the request body
      body: JSON.stringify({ img: img })
    });

    // Parse the response as JSON
    result = await result.json();
    console.log(result);

    // If the upload is successful, show an alert, reset state, and fetch all images
    if (result.success) {
      alert(result.message);

      setImg(""); // Reset the state variable for the selected image
      getImage(); // Fetch all images to update the display
    }
  }
}




