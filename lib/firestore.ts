import { db } from './firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { Product } from '../types/products'

export const getProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, 'products_en')
  const productsSnapshot = await getDocs(productsCollection)
  const productsList = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[]

  return productsList
}

// Function to fetch a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const productRef = doc(db, 'products_en', id) // Fetch from the fixed collection
  const productSnap = await getDoc(productRef)

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() } as Product
  } else {
    return null
  }
}

// Function to fetch unique origins
export const getOrigins = async (): Promise<string[]> => {
  const productsCollection = collection(db, 'products_en')
  const productsSnapshot = await getDocs(productsCollection)

  // Extract and deduplicate origins
  const originsSet = new Set(
    productsSnapshot.docs.map((doc) => doc.data().origin).filter(Boolean),
  )

  return Array.from(originsSet)
}
