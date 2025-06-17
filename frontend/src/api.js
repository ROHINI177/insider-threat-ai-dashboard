const BASE_URL = process.env.REACT_APP_API_URL;

fetch(`${BASE_URL}/api/behavior`, {
  method: "POST",
  ...
});
