export const getStart = async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server avviato correttamente'
  })
}
