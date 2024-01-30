function numberWithCommas(pram: number) {
  // Chuyển đổi số thành chuỗi
  const numberString = pram.toString()

  // Tìm vị trí của dấu thập phân (nếu có)
  const decimalIndex = numberString.indexOf('.')

  // Tạo mảng từ chuỗi
  const numberArray = decimalIndex !== -1 ? numberString.slice(0, decimalIndex).split('') : numberString.split('')

  // Lặp qua từ phải sang trái, thêm dấu phân cách hàng nghìn sau mỗi 3 chữ số
  for (let i = numberArray.length - 3; i > 0; i -= 3) {
    numberArray.splice(i, 0, ',')
  }

  // Nếu có dấu thập phân, thêm phần thập phân vào chuỗi kết quả
  if (decimalIndex !== -1) {
    const decimalPart = numberString.slice(decimalIndex)
    return numberArray.join('') + decimalPart
  }

  // Trả về chuỗi đã được định dạng
  return numberArray.join('')
}

export { numberWithCommas }
