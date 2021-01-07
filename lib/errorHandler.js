export const invalidID = 'primateNotFound'
export const unauthorized = 'unauthorized'
export const forbidden = 'forbidden'


export default function errorHandler(err, _req, res, next) {
  console.log('An error occured:', err.name, err.message)

  if (err.name === 'ValidationError') {
    const customErrors = {}
    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json({
      message: 'Form Validation Errors',
      errors: customErrors,
    })
  }

  if (err.message === invalidID || err.name === 'CastError') {
    return res.status(404).json('Item not found')
  }

  if (err.message === forbidden) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  if (err.message === unauthorized) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.sendStatus(500)
  next(err)
}