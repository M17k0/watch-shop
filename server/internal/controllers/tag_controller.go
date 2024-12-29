package controllers

import (
	"net/http"
	"strconv"
	"watch-shop-server/internal/services"

	"github.com/gin-gonic/gin"
)

type TagController struct {
	TagService *services.TagService
}

func NewTagController(tagService *services.TagService) *TagController {
	return &TagController{TagService: tagService}
}

func (tc *TagController) GetTagByID(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tag ID"})
		return
	}

	tag, err := tc.TagService.GetTagByID(uint(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve tag"})
		return
	}

	ctx.JSON(http.StatusOK, tag)
}
