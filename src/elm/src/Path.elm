module Path exposing (img)


imgBaseDir : String
imgBaseDir =
    "./assets/images/"


img : String -> String
img path =
    imgBaseDir ++ path
