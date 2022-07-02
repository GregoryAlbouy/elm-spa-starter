module Main exposing (main)

import Browser
import Html exposing (h1, text)


type alias Model =
    String


type Msg
    = Nothing


view : Model -> Browser.Document Msg
view model =
    { title = model
    , body = [ h1 [] [ text model ] ]
    }


main : Program () Model Msg
main =
    Browser.document
        { init = \_ -> ( "Hello, World!", Cmd.none )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = view
        }
