export const REQ_STATUS = {
  INIT: "init",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const nameregex = /^[a-zA-Z. ]{2,30}$/;
export const phoneRegex = /^(\+91[\s-]?)?[0]?(91)?[789]\d{9}$/;

export const cardNumberRegex = /^(?:\d{4}[- ]?){3}\d{4}$/;

export const cvvRegex = /^\d{3,4}$/;

export const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";

export const CITIES_API_URL = "https://api.api-ninjas.com/v1/city";

export const X_API_KEY = "/kzrI3WH2XT9+hngd5prDw==WtCc2x2eCYVhmN96";
