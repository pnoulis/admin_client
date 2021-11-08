import validator from "validator";
import PathConstructor from "lib/utils/paths";


export {validateInput, reduceFieldErrors};

const
reduceFieldErrors = (fieldErrors, name, input) => !INPUTS[name] ? {...fieldErrors, [name]: false} :
{...fieldErrors, [name]: INPUTS[name](input)},
validateInput = (name, input) => !INPUTS[name] ? false : INPUTS[name](input),
charsAllowedProduct = "(a-z0-9,.-_:%\"')",
INPUTS = {
  password(password) {
    const
    LENGTH_LIMIT = 150,
    tooLong = `Password exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "Password required, example: Liberty1",
    wrongFormat = "Password must contain at least 1 capital letter and 1 number";

    if (!password) return emptyInput;
    if (password.length > LENGTH_LIMIT) return tooLong;
    if (!/.*(\d+.*[A-Z]+.*|[A-Z]+.*\d+.*)+.*/.test(password)) return wrongFormat;
    return false;
  },
  username(username) {
    const
    LENGTH_LIMIT = 30,
    tooLong = `Username exceeds ${LENGTH_LIMIT} characters`,
    wrongFormat = "Expected format: (John)",
    emptyInput = "Username required, example: John";

    if (!username) return emptyInput;
    if (username.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isAlphanumeric(username, ["en-US"])) return wrongFormat;
    return false;
  },
  email: function(email) {
    const
    LENGTH_LIMIT = 150,
    tooLong = `Email exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "Email required, example: me@gmail.com",
    wrongFormat = "Expected format: (me@gmail.com)";

    if (!email) return emptyInput;
    if (email.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isEmail(email)) return wrongFormat;
    return false;
  },
  tel: function(number) {
    const
    LENGTH_LIMIT = "30",
    tooLong = `Mobile phone exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "Mobile number required, example: 07544945926",
    wrongFormat = "Expected format: (07544945926)";

    if (!number) return emptyInput;
    if (number.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isNumeric(number)) return wrongFormat;
    return false;
  },

  type: function(type) {
    const
    emptyInput = "Type required!",
    wrongFormat =  "Expected format: (John Scot)";

    if (!type)
      return emptyInput;
    else if (!validator.isAlpha(type, ["en-US"], {ignore: " "}))
      return wrongFormat;
    else
      return false;
  },

  city: function(city) {
    const
    LENGTH_LIMIT = 30,
    tooLong = `City exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "City required, example: New York",
    wrongFormat =  "Expected format: (New York)";

    if (!city) return emptyInput;
    if (city.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isAlpha(city, ["en-US"])) return wrongFormat;
    return false;
  },

  region: function(region) {
    const
    LENGTH_LIMIT = 50,
    tooLong = `Region exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "Region required, example: Texas",
    wrongFormat = "Expected format: (Texas)";

    if (!region) return emptyInput;
    if (region.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isAlpha(region, ["en-US"], {ignore: " "})) return wrongFormat;
    return false;
  },

  postcode: function(postcode) {
    const
    LENGTH_LIMIT = 10,
    tooLong = `Postcode exceeds ${LENGTH_LIMIT} characters`,
    emptyInput = "Postcode required, example: BS16 5SE, 55438, ...",
    wrongFormat = "Expected format: BS16 5SE, 55438, ...";

    if (!postcode) return emptyInput;
    if (postcode.length > LENGTH_LIMIT) return tooLong;
    if (!validator.isPostalCode(postcode, "any")) return wrongFormat;
    return false;
  },

  street: function(street) {
    const
    LENGTH_LIMIT = 150,
    tooLong = `Street field should be less than ${LENGTH_LIMIT} characts`,
    emptyInput = "Address line required, example: 10 Downing Street, Westminster",
    wrongFormat = "Expected format: 10 Downing Street, Westminster";

    if (!street) return emptyInput;
    if (street.length > LENGTH_LIMIT) return tooLong;
    if (/[^a-zA-Z0-9\s.-_ ]/.test(street)) return wrongFormat;
    return false;
  },

  country: function(country) {
    const
    LENGTH_LIMIT = 30,
    tooLong = `Country exceeds ${LENGTH_LIMIT} characters`,
    wrongFormat = "Countries do not use numerals or specials characters",
    emptyInput = "Country required!";

    if (!country) return emptyInput;
    if (country === "country*") return emptyInput;
    if (country.length > LENGTH_LIMIT) return tooLong;
    if (/[^a-z]/.test(country)) return wrongFormat;
    return false;
  },

  // generic
  alphaNum: function(string) {
    const emptyInput = "One of the fields was left empty!",
          wrongFormat = "Only alphanumeric characters are allowed!";
    if (!string)
      return emptyInput;
    else if (!validator.isAlphanumeric(string, ["en-US"]))
      return wrongFormat;
    else
      return false;
  },

  // again generic, usually is send along with alphaNum above,
  // it is the case where a key and a value must be providde.
  // the key field is given a name of alphaNum, and the value field
  // a name of value
  value: function(string) {
    const emptyInput = "One of the fields was left empty!";
    if (!string)
      return emptyInput;
    else
      return false;
  },

  title: function(string) {
    const LENGTH_LIMIT = 40,
          emptyInput = "The title was left empty!",
          tooLong = `The title must be less than ${LENGTH_LIMIT} characters long`,
          wrongFormat = `Title field is allowed only ${charsAllowedProduct}`;

    if (!string)
      return emptyInput;
    else if (string.length > LENGTH_LIMIT)
      return tooLong;
     else if (/[^\w\s\n-,.:%"']/.test(string))
       return wrongFormat;
    else
      return false;
  },

  description: function(string) {
    const LENGTH_LIMIT = 200,
          emptyInput = "The description was left empty!",
          tooLong = `The description must be less than ${LENGTH_LIMIT} characters long!`,
          wrongFormat = `Description field is allowed only ${charsAllowedProduct}`;

    if (!string)
      return emptyInput;
    else if (string.length > LENGTH_LIMIT)
      return tooLong;
    else if (/[^\w\s-,.:%"']/.test(string))
      return wrongFormat;
    else
      return false;
  },

  supplier: function(string) {
    const OPTIONAL = true,
          LENGTH_LIMIT = 15,
          tooLong = `The supplier must be less than ${LENGTH_LIMIT} characters long!`,
          wrongFormat = `Supplier field is allowed only ${charsAllowedProduct}`;

    if (!string && OPTIONAL) return false;
    else if (string.length > LENGTH_LIMIT) return tooLong;
    else if (/[^\w\s-,.:%"']/.test(string)) return wrongFormat;
    else return false;
  },

  supplierId: function(string) {
    const OPTIONAL = true,
          LENGTH_LIMIT = 15,
          tooLong = `The supplier id must be less than ${LENGTH_LIMIT} characters long!`,
          wrongFormat = `Supplier id field is allowed only ${charsAllowedProduct}`;

    if (!string && OPTIONAL) return false;
    else if (string.length > LENGTH_LIMIT) return tooLong;
    else if (/[^\w\s-,.:%"']/.test(string)) return wrongFormat;
    else return false;
  },

  tags: function(array) {
    const emptyInput = "No tag was selected!";

    if (!array.length) return emptyInput;
    else return false;
  },

  units: function(number) {
    const string = number.toString(),
          emptyInput = "Units field is empty!",
          wrongFormat = "Units field is allowed only (0-9.)";

    if (!string) return emptyInput;
    else if (/[^0-9.]/.test(string)) return wrongFormat;
    else return false;
  },

  wpu: function(number) {
    const string = number.toString(),
          emptyInput = "Wpu field is empty!",
          wrongFormat = "Wpu field is allowed only (0-9)",
          numberLessThan0 = "Wpu cannot be less than 0";

    console.log(number);
    if (!string) return emptyInput;
    else if (/[^0-9]|^0/.test(string)) return wrongFormat;
    else if (number <= 0) return numberLessThan0;
    else return false;
  },

  ppu: function(number) {
    const string = number.toString(),
          emptyInput = "Ppu field is empty!",
          wrongFormat = "Ppu field is allowed only (0-9.)";

    if (!string) return emptyInput;
    else if (/[^0-9.]/.test(string)) return wrongFormat;
    else return false;
  },

  tp: function(number) {
    const
    string = number.toString(),
    emptyInput = "Tp Field is empty!",
    wrongFormat = "Tp field is allowed only (0-9.)";

    if (!string) return emptyInput;
    else if (/[^0-9.]/.test(string)) return wrongFormat;
    else return false;
  },
  mu: function(array) {
    const
    isEmpty = "Measuring unit has not been selected";
    if (!array.length) return isEmpty;
    return false;
  },
  volume: function(number) {
    const
    string = number.toString(),
    wrongFormat = "volume field is allowed only (0-9)";

    if ((/[^0-9]/.test(string))) return wrongFormat;
    return false;
  },

  pu: function(string) {
    const emptyInput = "Price units field is empty!";

    if (!string) return emptyInput;
    return false;
  },

  stock: function(number) {
    const OPTIONAL = true,
          string = number.toString(),
          emptyInput = "Stock field is empty!",
          wrongFormat = "Stock field is allowed only (0-9)";

    if (!string && OPTIONAL) return false;
    else if (/[^0-9]/.test(string)) return wrongFormat;
    else return false;
  },

  img: function(img) {
    if (!(img instanceof File) && Object.keys(img).length) return false;
    if (!img.name) return "you forgot to upload an image";

    const LENGTH_LIMIT = 124, // completely arbitrary
          ext = PathConstructor.extractExt(img.name),
          filename = PathConstructor.extractName(img.name),
          mime = img.type,
          IMG_FORMATS = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "image/tiff",
            "image/bmp",
          ],
          tooLong = `The image name exceeds ${LENGTH_LIMIT} chararcters, please shorten it`,
          illegalChars = "Please reformat the image file name to only include characters from" +
          "the set: [a-zA-Z0-9-_.] (no spaces are allowed)",
          notAnImg = "The file you tried to upload is not an img." +
          "The accepted formats are: (jpg, jpeg), (png), (gif), (webp), (bmp), (svg+xml)",
          isImg = function() {
            let match = false;
            IMG_FORMATS.forEach(format => {
              if (format === mime) match = true;
            });
            return match;
          };

    if (filename.length > LENGTH_LIMIT) return tooLong;
    else if (/[^a-zA-Z0-9-_]/.test(filename)) return illegalChars;
    else if (!isImg()) return notAnImg;
    else return false;
  },
};
