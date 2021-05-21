import DOMPurify from "dompurify";

export const dateFormater = (date) => {
  const a = date.toString().split(" ");
  switch (a[1]) {
    case "day":
      return 1 + " " + a[1].split("ay", 1);
    case "days":
      return a[0] + " " + a[1].split("ays", 1);
    case "hour":
      return 1 + " " + a[1].split("our", 1);
    case "hours":
      return a[0] + " " + a[1].split("ours", 1);
    case "minute":
      return 1 + " " + a[1].split("inute", 1);
    case "minutes":
      return a[0] + " " + a[1].split("inutes", 1);
    case "few":
      return 1 + " " + a[2].split("econds", 1);
    default:
      return date;
  } // ("2 days ago") = > [ "2","days","ago"]
};

export const truncateString = (string, limit) => {
  if (string) {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    } else {
      return string;
    }
  }
  return string;
};

export const displayBody = (body) => {
  const sanatized = DOMPurify.sanitize(body);
  return { __html: sanatized };
};

export const sanatize = (body) => {
  let cleanBody;
  const sanatized = DOMPurify.sanitize(body);
  const cleanHtmlTags = sanatized.replace(/<[^>]*>/g, "");
  const searchHashTags = cleanHtmlTags.replace(
    /(^|\W)(#[a-zA-Z]+\b)/gi,
    "$1<span id=hash-tag>$2</span>"
  );
  const isUserInBody = searchHashTags.replace(
    /(^|\W)(@[a-zA-Z]+\b)/gi,
    "$1<span id=hash-tag>$2</span>"
  );
  cleanBody = isUserInBody;

  return cleanBody;
};

export const searchTags = (body) => {
  var myReHashTags = /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g;
  var myReAt = /(?<=[\s>]|^)@(\w*[A-Za-z_]+\w*)/g;
  var str = body;
  var myHashTagsArray = str.match(myReHashTags);
  var myAtTagsArray = str.match(myReAt);

  return {
    hashtags: myHashTagsArray,
    ats: myAtTagsArray,
  };
};
