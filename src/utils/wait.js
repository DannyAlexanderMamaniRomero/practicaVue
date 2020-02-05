export default function (msvar) {
    const ms = msvar
    return new Promise((resolve, reject) => {
      if (!ms) return reject
      return setTimeout(resolve, ms)
    })
  }