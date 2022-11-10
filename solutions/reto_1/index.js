// @ts-check
/**
 * @param {string} input 
 */
function parse(input) {
  const users = input
    .split("\n\n")
    .map((u) =>
      Object.fromEntries(u.split(/ |\n/).map((item) => {
        const sepIndex = item.indexOf(':')
        return [
          item.slice(0, sepIndex),
          item.slice(sepIndex + 1),
        ]
      }))
    );
  return users
}

const VALID_FIELDS = ["usr", "eme", "psw", "age", "loc", "fll"];

function isValid(user) {
  return VALID_FIELDS.every((field) => (field in user));
}

/**
 * @param {string} input 
 */
export async function getSolution() {
  const data = await getInputData()
  
  const { validCount, lastValidUser } = parse(data)
    .reduce((acc, user) => {
      if (isValid(user)) {
        acc.validCount++;
        acc.lastValidUser = user.usr
      }

      return acc
    }, { validCount: 0, lastValidUser: '' })

  return `${validCount}${lastValidUser}`
}


async function getInputData() {
  const response = await fetch(new URL('./users.txt', import.meta.url).href)
  return response.text()
}