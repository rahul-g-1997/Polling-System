export const homeController = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "Hello from the polling system API",
  });
};
