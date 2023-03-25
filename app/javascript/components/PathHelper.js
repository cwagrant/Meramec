const pathHelper = (url) => {
  return function (id) {
    switch (typeof (id)) {
      case "undefined":
        return url;

      case "object":
        let newUrl = url;
        for (const [key, value] of Object.entries(id)) {
          newUrl = url.replace(`:${key}`, value);
        }
        return newUrl;

      default:
        return `${url}/${id}`;
    }
  };
};

/* Assuming this isn't being too clever for my own good we
 * can use pathHelper as a currying function so that if a
 * param is passed into the path helper we'll apply it to
 * the end of the string along with a slash.
 *
 * Possibly this could be elaborated on in the future to
 * take a hash of values and expand them for nested routes.
 *
 * So the returned function would, if just a string or
 * number append that to the end. If it's a hash then we
 * could replace all instances of `key` with `value` in
 * the url.
 *
 * E.g. pathHelper("/properties/{propertyId}/units/{unitId}")
 * would, when called with ({propertyId: 1, unitId: 2}) expand
 * into /properties/1/units/2
 *
 * */

export const API = {
  UNITS: pathHelper("/api/units"),
  PROPERTIES: pathHelper("/api/properties"),
  CUSTOMERS: pathHelper("/api/customers"),
  RENTAL_AGREEMENTS: pathHelper("/api/rental_agreements"),
  PAYMENTS: pathHelper("/api/payments"),
  USER: {
    LOGIN: pathHelper("/api/login"),
    LOGOUT: pathHelper("/api/logout"),
    REGISTER: pathHelper("/api/signup"),
  },
};
