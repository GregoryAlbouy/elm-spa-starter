module Path exposing (img)


imgBaseDir : String
imgBaseDir =
    "./dist/assets/images"


img : String -> String
img path =
    imgBaseDir ++ path
