export const formatDateFunction = (dateString: string): string | undefined => {
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours === 0) {
      if (minutes <= 5) {
        return "Just now";
      }
      return `${minutes} minutes ago`;
    }
    if (hours < 24) {
      return `${hours} hours ago`;
    }
  } else if (days === 1) {
    return "Yesterday";
  } else if (days <= 30) {
    return `${days} days ago`;
  } else if (days <= 30) {
    const months = Math.floor(days / 30);
    if (months > 1) return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days <= 365) {
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else {
    return "More than a year ago";
  }
};
