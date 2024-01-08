export function movieRentalStatus(rentalStatus){
  switch (rentalStatus) {
    case "Borrowing":
      return "借閱中";
      break;
    case "Canceled":
      return "已取消";
      break;
    default:
      return rentalStatus
      break;
  }
}
export function membershipLevel(membershipLevel) {
  switch (membershipLevel) {
    case "copper":
      return "青銅"
      break;
      case "silver":
        return "白銀"
        break;
      case "gold":
        return "黃金"
        break;
      case "diamond":
        return "鑽石"
        break;
    default:
      break;
  }
}