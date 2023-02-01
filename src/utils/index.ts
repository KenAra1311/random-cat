import { CatImage } from 'interfaces/index'

export const fetchCatImage = async (setCatImage: any): Promise<void> => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result = (await res.json()) as CatImage[]

    setCatImage(result[0].url)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
