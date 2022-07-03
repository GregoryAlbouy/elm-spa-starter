import { Elm } from "./elm/src/Main.elm";

const root = document.createElement("div");
root.id = "elm-app";
document.body.appendChild(root);

Elm.Main.init({
  node: root,
});
