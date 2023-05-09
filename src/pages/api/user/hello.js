// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json(`Hello ${req.body.name}, thanks for POSTing!`)
    return
  }
  res.status(200).json({ name: 'John Doe' })
}
