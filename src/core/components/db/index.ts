import Car from "models/car"
import Winner from "models/winner"

export default class DB {
  static async getAllCars(){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage`)
      const data: Car[] = await response.json() 
      return data
    } catch (e) {
      console.log(e)
      const empty: Car[] = []
      return empty
    }   
  }
  static async getAllCarsWithinPage(page: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`)
      const data: Car[] = await response.json() 
      return data
    } catch (e) {
      console.log(e)
      const empty: Car[] = []
      return empty
    }   
  }
  static async getCar(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`)
      const data: Car = await response.json() 
      return data
    } catch (e) {
      console.log(e)
      const empty = {}
      return empty
    }   
  }
  static async addCar(car: {}){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage`, {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data: {} = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async deleteCar(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      })
      const data: {} = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async updateCar(car: {}, id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'PUT',
        body: JSON.stringify(car),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data: {} = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async startEngine(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine/?id=${id}&status=started`, {
        method: 'PATCH'
      })
      const data: {velocity: number, distance: number} = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async driveMode(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine/?id=${id}&status=drive`, {
        method: 'PATCH'
      })
      const data: {} = await response.json() 
      return data
    } catch (e) {
      return 'error'
    }   
  }
  static async stopEngine(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine/?id=${id}&status=stopped`, {
        method: 'PATCH'
      })
      const data: {} = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async getWinner(id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`)
      const data: Winner = await response.json() 
      return data
    } catch (e) {
      console.log(e)
      return e
    }   
  }
  static async addWinner(winner: Winner){
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'POST',
        body: JSON.stringify(winner),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data: Winner = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
  static async getAllWinners(options?: {page?: number, sortBy?: string, sortOrder?: string}){
    try {
      let url = `http://127.0.0.1:3000/winners`
      if (options?.page) {
        if (options?.sortBy) {
          url = `http://127.0.0.1:3000/winners?_page=${options.page}&_limit=10&_sort=${
            options.sortBy}&_order=${options.sortOrder}`
        } else {
          url = `http://127.0.0.1:3000/winners?_page=${options.page}&_limit=10`
        }
        
      }
      const response = await fetch(url)
      const data: Winner[] = await response.json() 
      return data
    } catch (e) {
      console.log(e)
      const empty: Winner[] = []
      return empty
    }   
  }
  static async updateWinner(winner: {}, id: number){
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(winner),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data: Winner = await response.json() 
      return data
    } catch (e) {
      console.log(e)
    }   
  }
}
