export default function containsSpecialChars(str: string) {
    const specialChars: RegExp = /[`!@#$%^&*()_+\=\[\]{};':"\\|<>\/?~]/;
    return specialChars.test(str);
  }