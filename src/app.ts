import { Elm } from "./elm/src/Main.elm";
import "./scss/main.scss";

const root = document.createElement("div");
root.id = "elm-app";
document.body.appendChild(root);

Elm.Main.init({
  node: root,
});
