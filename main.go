/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 01-05-2019
 * |
 * | File Name:     main.go
 * +===============================================
 */

package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/ping", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
	e.Static("/static", "build")
	e.File("/", "build/index.html")

	e.Logger.Fatal(e.Start(":1323"))
}
