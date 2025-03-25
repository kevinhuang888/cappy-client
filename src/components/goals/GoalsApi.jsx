  //APIs
  export async function getCategories() {
    try{
      const response = await fetch(`http://localhost:5002/category/`)
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const categories = await response.json()
      return categories
    } catch(err){
      console.error(err.message)
    }
  }

  export async function postCategory(newCategory) {
    try{
      const response = await fetch(`http://localhost:5002/category/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newCategory)
      })
      if(!response.ok){
        throw new Error(`postCategoryResponse status: ${response.status}`)
      }
      const category = await response.json()
      console.log(`New Category created: ${category}`)
      return category

    } catch(err){
      console.error(err.message)
    }
  }

  export async function putCategory(newCategory) {
    try{
      const response = await fetch(`http://localhost:5002/category/${newCategory._id}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newCategory)
      })
      if(!response.ok){
        throw new Error(`putCategoryResponse status: ${response.status}`)
      }
      const category = await response.json()
      console.log(`Category: ${JSON.stringify(category.name)} Updated`)
      return category

    } catch(err){
      console.error(err.message)
    }
  }

  export async function postGoal(newGoal) {
    try{
      const response = await fetch(`http://localhost:5002/goal/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newGoal)
      })
      if(!response.ok){
        throw new Error(`postGoal status: ${response.status}`)
      }
      const goal = await response.json()
      console.log(`New Goal created: ${goal}`)
      return goal

    } catch(err){
      console.error(err.message)
    }
  }

  export async function getGoalById(goalId) {
    try{
      const response = await fetch(`http://localhost:5002/goal/${goalId}`)
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const goal = await response.json()
      console.log(`[getGoalById] Id: ${goalId}, Data: ${JSON.stringify(goal)}`)
      return goal
    } catch(err){
      console.error(err.message)
    }
}