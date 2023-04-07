import { merge, set } from "lodash";

export default function reducer(state, action) {
  if (action.type == "initialize") {
    // this takes the default state passed in to the reducer
    // and merges in a state over top of it.
    return merge({ ...state }, action.value);
  }

  if (action.type == "reset") {
    return action.value;
  }

  console.log("oldState", state, action);
  let newState = { ...state };

  // We use the lodash method set so that we have a lot of
  // flexibility as to what can be passed in as an action.type
  //
  // e.g. address.address_1, invoice_items[0].price_in_cents
  set(newState, action.type, action.value);
  console.log("newState", newState);

  return newState;
}
