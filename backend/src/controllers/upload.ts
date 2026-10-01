import cloudinary from '../config/cloudinary'

export const uploadImagen = async (archivo: File) => {
  const buffer = await archivo.arrayBuffer()
  const bytes = Buffer.from(buffer)
  const base64 = bytes.toString('base64')
  const dataUri = `data:${archivo.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'sam-tecnologia',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4'],
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto' }
    ]
  })

  return {
    url: result.secure_url,
    public_id: result.public_id
  }
}

export const deleteImagen = async (public_id: string) => {
  const result = await cloudinary.uploader.destroy(public_id)
  return result
}