/* eslint-disable no-unused-vars */
import faker from 'faker'

const genderArray = ['Female', 'Male', 'Trans man', 'Trans woman', 'Intersex', 'Prefer not to say']
function genderCalc() {
  const number = Math.random() * 100
  if (number < 45) {
    return 0
  } else if (number < 90) {
    return 1
  } else if (number < 92.5) {
    return 2
  } else if (number < 95) {
    return 3
  } else if (number < 97.5) {
    return 4
  } else if (number <= 100) {
    return 5
  }
}
const sexualOrientationArray = ['Men', 'Women', 'Everyone']
const politicsArray = ['Liberal', 'Conservative', 'Fascist', 'Socialist', 'Anarchist', 'Doesn\'t vote', 'Communist']
const interestsArray = ['Cooking', 'Blogging', 'Book restoration', 'Photography', 'Reading', 'Traveling', 'Music', 'Yoga', 'Volunteering', 'Freestyle rapping', 'Bowling', 'Singing', 'Astrology', 'Card games', 'Ceramics', 'Welding', 'Poetry', 'Dark humour', 'Karate', 'Taxidermy', 'Sewing', 'Alcohol', 'Meditation', 'Origami', 'Chiromancy', 'Camping', 'Hunting', 'Lacrosse', 'Skateboarding', 'Birdwatching', 'Gardening', 'Shopping', 'Sand art', 'Parkour', 'Polo', 'Hiking', 'Rock climbing', 'DIY', 'Video games', 'Magnets']
function assignInterests() {
  const numberOfInterests = Math.floor(Math.random() * 5) + 1
  const interestList = []
  for (let i = 1; i <= numberOfInterests; i++) {
    const randomInterest = interestsArray[Math.floor(Math.random() * interestsArray.length)]
    interestList.push(randomInterest)
  }
  return interestList
}
const foodPreferencesArray = ['Vegetarian', 'Gluten free', 'Dairy free', 'Omnivore', 'Nut allergy', 'Pescatarian', 'Vegan', 'Macrobiotic']

function generateUsers() {
  const users = []

  for (let i = 1; i <= 100; i++) {
    const firstName = faker.name.firstName()
    const surname = faker.name.lastName()
    const email = faker.internet.email()
    const password = 'test'
    const profilePicture = faker.image.people()
    const alias = faker.internet.userName()
    const age = Math.floor(Math.random() * 52) + 18
    const gender = faker.name.gender()
    const sexualOrientation = sexualOrientationArray[Math.floor(Math.random() * 3)]
    const politics = politicsArray[Math.floor(Math.random() * 7)]
    const height = Math.floor(Math.random() * 44) + 154
    const isSmoker = Math.random() < 0.3
    const interests = assignInterests()
    const isOpenToDrugs = Math.random() < 0.5
    const foodPreferences = foodPreferencesArray[Math.floor(Math.random() * 8)]

    users.push(
      {
        'firstName': firstName,
        'surname': surname,
        'email': email,
        'password': password,
        'passwordConfirmation': password,
        'profilePicture': profilePicture,
        'alias': alias,
        'age': age,
        'gender': gender,
        'sexualOrientation': sexualOrientation,
        'politics': politics,
        'height': height,
        'isSmoker': isSmoker,
        'interests': interests,
        'isOpenToDrugs': isOpenToDrugs,
        'foodPreferences': foodPreferences,
      }
    )
  }
  return users
}


const usersDataObj = generateUsers()

export default usersDataObj



// export default [
//   {
//     email: 'test1',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test2',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test3',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test4',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test5',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test6',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test7',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test8',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test9',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test10',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test11',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test12',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test13',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test14',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test15',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test16',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test17',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test18',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test19',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test20',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test21',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test22',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test23',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test24',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   },
//   {
//     email: 'test25',
//     firstName: 'test',
//     surname: 'test',
//     password: 'test',
//     passwordConfirmation: 'test'
//   }
// ]