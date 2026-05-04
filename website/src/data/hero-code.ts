import { siteConfig } from "./config";

const importPath = siteConfig.github.replace("https://github.com/", "github.com/");

export const heroCode = `package main

import (
    "fmt"
    gogenfilter "${importPath}"
)

func main() {
    opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterAll)
    if err != nil {
        panic(err)
    }
    f, err := gogenfilter.NewFilter(opts)
    if err != nil {
        panic(err)
    }

    filtered, _ := f.Filter("db/models.go")
    fmt.Println(filtered) // true — sqlc generated
}`;
