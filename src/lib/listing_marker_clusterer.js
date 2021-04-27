export const clusterIconTemplate = (fill) => {
  return `
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="${fill}"></circle>
    </svg>
    `
}

export const clusterIcon = (fill='rgba(72, 71, 69, 0.8)') => {
  return (`data:image/svg+xml;charset=utf-8,${encodeURIComponent(clusterIconTemplate(fill))}`)
}

export const calculateAnchorTextHeight = (clusterHeight, percentFromTop=30) => {
  return (percentFromTop / 100) * clusterHeight
}

export const defaultClusterStyle = {
  width: 30,
  height: 30,
  url: clusterIcon(),
  textColor: 'white',
  textSize: 14,
  anchorText: [calculateAnchorTextHeight(30), 0],
}

export const clusterSizes = [30, 35, 40, 45, 50]

export const createClusterStyle = (size) => {
  return {
    ...defaultClusterStyle,
    width: size,
    height: size,
    anchorText: [calculateAnchorTextHeight(size), 0],
  }
}

export const getClusterStyles = () => {
  return clusterSizes.map(createClusterStyle)
}

