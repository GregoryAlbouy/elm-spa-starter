module Main exposing (Model, main)

import Browser
import Html exposing (h1, img, text)
import Html.Attributes exposing (src)
import Path


type alias Model =
    String


view : Model -> Browser.Document msg
view model =
    { title = model
    , body =
        [ h1 [] [ text model ]
        , img [ src (Path.img "elm-logo.svg") ] []
        ]
    }


main : Program () Model msg
main =
    Browser.document
        { init = \_ -> ( "Hello, World!", Cmd.none )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = view
        }
