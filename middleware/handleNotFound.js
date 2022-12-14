export const handleNotFound = (_req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
}
