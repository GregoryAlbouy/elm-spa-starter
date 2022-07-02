module Main exposing (main)

import Browser
import Html exposing (h1, img, text)
import Html.Attributes exposing (src)
import Path


type alias Model =
    String


type Msg
    = Nothing


view : Model -> Browser.Document Msg
view model =
    { title = model
    , body =
        [ h1 [] [ text model ]
        , img [ src (Path.img "elm-logo.svg") ] []
        ]
    }


main : Program () Model Msg
main =
    Browser.document
        { init = \_ -> ( "Hello, World!", Cmd.none )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = view
        }
