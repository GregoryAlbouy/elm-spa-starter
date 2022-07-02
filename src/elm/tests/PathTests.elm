module PathTests exposing (..)

import Expect
import Fuzz exposing (string)
import Path
import Test exposing (..)


imgBaseDir : String
imgBaseDir =
    "./dist/assets/images"


testImg : Test
testImg =
    describe "Path.img"
        [ fuzz string "computes full image path" <|
            \randomString -> Expect.equal (imgBaseDir ++ randomString) (Path.img randomString)
        ]
