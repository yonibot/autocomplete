// obviously not for production code
const API_KEY = 'NIVw7KoRQ6+uU51Xwa3dQA==yVu7rfeEfMvDy31u'
const APU_URL = 'https://api.api-ninjas.com/v1/animals'

export async function fetchAnimals(searchTerm: string) {
  try {
    let animalsListResponse = await fetch(`${APU_URL}?name=${searchTerm}`, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });
    let jsonAnimals = await animalsListResponse.json();
    return jsonAnimals.map(animal => ({
        id: animal.name,
        label: animal.name,
        data: animal
    }))
  } catch(error) {
    console.log("API ERROR. ", error)
  }
}
