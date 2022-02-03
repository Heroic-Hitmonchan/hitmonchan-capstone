// playlist name to spotify playlist ID
const playlist = {
  party: '37i9dQZF1DXaXB8fQg7xif',
  folk: '37i9dQZF1DXaUDcU6KDCj4',
  romantic: '37i9dQZF1DWXb9I5xoXLjp',
}

// input: RGB array and an optional secondary array of RGB arrays
// output: playlist specified in the above object
// example: colorSort([1, 255, 25]) returns playlist.folk (37i9dQZF1DXaUDcU6KDCj4)
const colorSort = (accentArr, secondaryArr) => {
  if (!secondaryArr) {
    let [red, green, blue] = accentArr
    let highestVal = Math.max(...accentArr)
    if (highestVal === red) {
      return playlist.party
    } else if (highestVal === green) {
      return playlist.folk
    } else if (highestVal === blue) {
      return playlist.romantic
    }
  }
  else return playlist.party
}

export default colorSort
