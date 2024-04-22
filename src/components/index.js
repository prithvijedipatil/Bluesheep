export { default as Header } from "./Header";
export { default as MainContainer } from "./MainContainer";
export { default as CreateContainer } from "./CreateContainer";
export { default as HomeContainer } from "./HomeContainer";
export { default as Loader } from "./Loader";
export { default as RowContainer } from "./RowContainer";
export { default as MenuContainer } from "./MenuContainer";
export { default as CartContainer } from "./CartContainer";
export { default as CartItem } from "./CartItem";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
