const handler = (req, res) => {
  const body = req.body;

  if (!body.first || !body.last) {
    return res.status(400).json({ data: 'First or last name not found' });
  }

  res.status(200).json({ data: `${body.first} ${body.last}` });
};

export default handler;
