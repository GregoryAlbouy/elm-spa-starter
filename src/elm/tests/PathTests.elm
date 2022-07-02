module PathTests exposing (testImg)

import Expect
import Fuzz exposing (string)
import Path
import Test exposing (Test, describe, fuzz)


imgBaseDir : String
imgBaseDir =
    "./assets/images/"


testImg : Test
testImg =
    describe "Path.img"
        [ fuzz string "computes full image path" <|
            \randomString ->
                Expect.equal
                    (imgBaseDir ++ randomString)
                    (Path.img randomString)
        ]
