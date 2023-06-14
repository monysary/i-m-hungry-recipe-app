export default function getTimeAgo(dateString) {
  const date = new Date(dateString)
  const currentTime = new Date()
  const timeDiff = currentTime - date
  const minutes = Math.floor(timeDiff / 1000 / 60)
  const hours = Math.floor(timeDiff / 1000 / 60 / 60)
  const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24)

  if (minutes < 1) {
    return "just now"
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  } else {
    return `${days} ${days === 1 ? "day" : "days"} ago`
  }
}
