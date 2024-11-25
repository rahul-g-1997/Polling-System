// Controller function to handle requests to the root endpoint
export const homeController = (req, res) => {
  // Send a JSON response with a success status and greeting message
  res.status(200).json({
    success: true, // Indicates the request was successful
    greeting: "Hello from the polling system API", // Custom greeting message
  });
};
