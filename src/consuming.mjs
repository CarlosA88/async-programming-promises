import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

export function get() {
//   fetch("http://localhost:3000/orders/1")
//     .then((response) => response.json())
//     .then(({ data }) => setText(data));

  axios.get("http://localhost:3000/orders/1").then(({ data }) => {
    setText(JSON.stringify(data));
  });
}

export function getCatch() {
  axios
    .get("http://localhost:3000/orders/1123")
    .then((result) => {
      setText(JSON.stringify(result.data));
    })
    .catch((e) => setText(e));
}

export function chain() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    });
}

export function chainCatch() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.my.city}`);
    })
    .catch((e) => setText(e));
}

export function final() {
  showWaiting();
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => {
      setText(`City: ${data.my.city}`);
    })
    .catch((e) => setText(e))
    .finally(() => {
      setTimeout(() => {
        hideWaiting();
      }, 1500);
    });
}
