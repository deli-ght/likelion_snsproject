const TEST_TOKEN = "Bearer " + localStorage.getItem("token")
const URL = "https://api.mandarin.cf"

const HEADER = new Headers({
  Authorization: TEST_TOKEN,
  "Content-type": "application/json",
})

const postFollow = async (username) => {
  const response = await fetch(`${`${URL}/profile/${username}/follow`}`, {
    method: "POST",
    headers: HEADER,
  })

  const data = await response.json()
  window.location.reload()
}

const deleteFollow = async (username) => {
  const response = await fetch(`${`${URL}/profile/${username}/unfollow`}`, {
    method: "DELETE",
    headers: HEADER,
  })

  const data = await response.json()
  window.location.reload()
}

function Follow(e, username) {
  e.stopPropagation()
  postFollow(username)
}

function Unfollow(e, username) {
  e.stopPropagation()
  deleteFollow(username)
}

export { Follow, Unfollow }
