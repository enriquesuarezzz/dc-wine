import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { Product } from '../types/products'

export const getProducts = async (locale: string): Promise<Product[]> => {
  const productsCollection = collection(db, `products_${locale}`)
  const productsSnapshot = await getDocs(productsCollection)
  const productsList = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // Make sure this includes all fields from your Product interface
  })) as Product[] // Typecasting to Product[] to ensure correct types

  return productsList
}
