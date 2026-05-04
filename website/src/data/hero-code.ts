import { siteConfig } from "./config";

const importPath = siteConfig.github.replace("https://github.com/", "github.com/");

export const heroCode = `package main

import (
    "fmt"
    gogenfilter "${importPath}"
)

func main() {
    f := gogenfilter.NewFilter(
        gogenfilter.Enabled(),
        gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
    )

    filtered, _ := f.ShouldFilter("db/models.go")
    fmt.Println(filtered) // true — sqlc generated
}`;
