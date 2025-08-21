export function validateEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    return "Email is required";
  }

  if (!emailRegex.test(email)) {
    // Check for specific issues to provide more helpful error messages
    if (email.indexOf("@") === -1) {
      return "Email must contain an @ symbol";
    }

    if (email.indexOf(".") === -1) {
      return "Email must contain a domain extension (e.g., .com)";
    }

    if (email.split("@")[0].length === 0) {
      return "Email must have characters before the @ symbol";
    }

    if (email.split("@")[1].indexOf(".") === -1) {
      return "Email domain must contain a dot (.)";
    }

    if (email.split("@")[1].split(".")[1].length < 2) {
      return "Domain extension must be at least 2 characters";
    }

    if (/[^a-zA-Z0-9._%+-]/.test(email.split("@")[0])) {
      return "Email contains invalid characters before the @ symbol";
    }

    return "Please enter a valid email address (e.g., user@example.com)";
  }

  return ""; // No error
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }

  // Check password length
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // Check for at least one digit
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character (!@#$%^&*)";
  }

  // Check for whitespace
  if (/\s/.test(password)) {
    return "Password cannot contain whitespace";
  }

  return ""; // No error
}