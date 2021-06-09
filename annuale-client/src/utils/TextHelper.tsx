const reduceText = (text: string, length: number) => {
  return text.length > length ? text.substr(0, length) + '...' : text
}

export { reduceText }
