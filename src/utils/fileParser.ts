import { Document } from 'docx'

export async function parseFile(file: File): Promise<string> {
  const fileType = file.name.split('.').pop()?.toLowerCase()

  switch (fileType) {
    case 'txt':
      return await file.text()
      
    case 'docx':
      const arrayBuffer = await file.arrayBuffer()
      const doc = new Document(arrayBuffer)
      const text = await doc.getText()
      return text
      
    case 'pdf':
      // We'll need to implement PDF parsing
      throw new Error('PDF parsing not implemented yet')
      
    default:
      throw new Error('Unsupported file type')
  }
} 