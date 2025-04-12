import { toast } from "react-toastify";
import AuthStudent, { AddToWishlist } from "../services/StudentServices";

export const setFavicon = (url) => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = url;
      document.head.appendChild(newLink);
    } else {
      link.href = url;
    }
  };

export const minuteToHrs = (minutes) => {
  if(minutes == 0 || !minutes) {
    return '0hr 0 min'
  }
  const hours = Math.floor(parseInt(minutes) / 60);
  const mins = minutes % 60;
  return `${hours}hr ${mins} min`;
}

export const formattedMinuteToHrs = (minutes) => {
  if(minutes == 0 || !minutes) {
    return '0hr 0 min'
  }
  const hours = Math.floor(parseInt(minutes) / 60);
  const mins = minutes % 60;
  if(hours === 0){
    return `${mins} min`
  }else{
    return `${hours}hr ${mins} min`;
  }
  
}

export function getLastThreeYears() {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear - 1, currentYear - 2];
}


export const formatMinutesToAll = (minutes) => {
  if (!minutes || isNaN(minutes)) return "00:00:00:000";

  const totalSeconds = Math.floor(minutes * 60);
  const milliseconds = Math.round((minutes * 60 - totalSeconds) * 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutesPart = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutesPart).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
};

export const minuteToHrsOnly = (minutes) => {
  if(minutes == 0 || !minutes) {
    return '0'
  }
  const hours = Math.ceil(parseInt(minutes) / 60);
  return `${hours}`;
}

export const minutesToTime = (minutes) => {
  const hours = Math.floor(parseInt(minutes) / 60);
  const mins = minutes % 60;
  const hoursStr = hours.toString().padStart(2, '0');
  const minsStr = mins.toString().padStart(2, '0');
  return `${hoursStr}:${minsStr}:00`
}

export const toFirstUpperCase = (str) => {
  if(!str || str === "") {
    return ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1)?.toLowerCase();
}

export const getUrl = () => {
  const url = window.location.href?.split("/");
  if(!url[4]) {
    return 'home'
  }
  return url[4];
}

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function containsSpecialCharacters(str) {
  // Define a regular expression for special characters
  const specialCharPattern = /[^a-zA-Z0-9\s]/;
  
  // Test the string against the pattern
  return specialCharPattern.test(str);
}

export function containsDigit(str) {
  // Define a regular expression to match any digit
  const digitPattern = /\d/;

  // Test the string against the pattern
  return digitPattern.test(str);
}

export function containsLetter(str) {
  // Define a regular expression to match any letter (uppercase or lowercase)
  const letterPattern = /[a-zA-Z]/;

  // Test the string against the pattern
  return letterPattern.test(str);
}

export const formatDateOnly = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "long",
    // day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export function getDaysDifference(dateString) {
  // Convert the given date string to a Date object
  const givenDate = new Date(dateString);
  
  // Get the current date
  const currentDate = new Date();
  
  // Calculate the difference in time (milliseconds)
  const timeDifference =givenDate - currentDate; // currentDate - givenDate
  
  // Convert the time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  return daysDifference;
}

export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = hours > 0 ? `${hours}:` : ""; // Include hours only if > 0
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};

export const numberToWords = (num) => {
  const belowTwenty = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
  ];

  if (num < 20) return belowTwenty[num];
  if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 === 0 ? "" : " " + belowTwenty[num % 10]);
  }
  if (num < 1000) {
    return (
      belowTwenty[Math.floor(num / 100)] +
      " hundred" +
      (num % 100 === 0 ? "" : " " + numberToWords(num % 100))
    );
  }
  return "Number out of supported range";
};

export const AddToWishlistHelper = (courseId) => {
  let data = JSON.stringify([courseId])
  const {student} = AuthStudent();
  if(student) {
    AddToWishlist(data).then((res)=>{
      toast.success(res?.message)
    }).catch((err)=>{
      console.log(err);
    })
  }
}

export function formatTimeOnly(dateString) {
  // Convert the input string to a Date object
  const date = new Date(dateString);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Return the formatted time
  return `${hours}:${formattedMinutes} ${amPm}`;
}

export function formatDateAndTime(dateString) {
  const date = new Date(dateString);
  
  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateMMY = date.toLocaleDateString("en-US", options);

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Return the formatted time
  return `${dateMMY} ${hours}:${formattedMinutes} ${amPm}`;
}

export function getDateType(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Helper functions to strip time from dates for comparison
  const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = stripTime(now);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const strippedDate = stripTime(date);

  // Determine the relative date (today, yesterday, or previous)
  let dateLabel;
  if (strippedDate.getTime() === today.getTime()) {
    dateLabel = "Today";
  } else if (strippedDate.getTime() === yesterday.getTime()) {
    dateLabel = "Yesterday";
  } else {
    const options = { year: "numeric", month: "short", day: "numeric" };
    dateLabel = date.toLocaleDateString("en-US", options);
  }

  // Return the formatted result
  return `${dateLabel}`;
}

export function formatGetDateType(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Helper functions to strip time from dates for comparison
  const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = stripTime(now);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const strippedDate = stripTime(date);

  // Determine the relative date (today, yesterday, or specific date)
  let dateLabel;
  if (strippedDate.getTime() === today.getTime()) {
    dateLabel = "Today";
  } else if (strippedDate.getTime() === yesterday.getTime()) {
    dateLabel = "Yesterday";
  } else {
    const options = { year: "numeric", month: "short", day: "numeric" };
    dateLabel = date.toLocaleDateString("en-US", options);
  }

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Combine date label and time
  return `${dateLabel} at ${hours}:${formattedMinutes} ${amPm}`;
}


export function isPdfOrImage(filename) {
  const fileExtension = filename.split('.').pop().toLowerCase();

  // Valid image extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

  // Valid PDF extension
  const pdfExtension = 'pdf';

  // Check if the file is a PDF or an image
  if (fileExtension === pdfExtension) {
    return 'pdf';
  } else if (imageExtensions.includes(fileExtension)) {
    return 'image';
  } else {
    return 'invalid'; // Not a PDF or image
  }
}


export function formatDateAndTimeTwo(dateString) {
  const date = new Date(dateString);
  
  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateMMY = date.toLocaleDateString("en-US", options);

  // Pad minutes with leading zero if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Return the formatted time
  return `${dateMMY} ${hours}:${formattedMinutes} ${amPm}`;
}