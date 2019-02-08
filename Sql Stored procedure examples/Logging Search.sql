USE [C64]
GO

/****** Object:  StoredProcedure [dbo].[logging_search]    Script Date: 2/8/2019 1:30:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[logging_search]
	@searchTerm VARCHAR(255) = null,
	@startDate DATETIME = null,
	@endDate DATETIME = null,
	@levelSearch VARCHAR (255) = null,
	@pageNumber INT,
	@pageSize INT,
	@sortBy VARCHAR(255) = null,
	@sortOrder VARCHAR(10) = null
AS

/*
DECLARE
	@searchTerm VARCHAR(255) = '',
	@levelSearch VARCHAR(255) = 'warn',
	@startDate DATETIME = '2018-12-01',
	@endDate DATETIME = '2018-12-12',
	@pageNumber INT = 3,
	@pageSize INT = 10,
	@sortBy VARCHAR(255) = 'level',
	@sortOrder VARCHAR(10)= 'ASC'
EXEC logging_search 
	@searchTerm,
	@startDate,
	@endDate,
	@levelSearch,
	@pageNumber,
	@pageSize,
	@sortBy,
	@sortOrder

*/
BEGIN
SELECT 
	Id,
	CreatedDate,
	Thread,
	Level,
	Logger,
	Message,
	Exception
FROM
	logging
WHERE
	Level LIKE ('%' + @levelSearch + '%' )
	AND (
		(Message Like ('%' + @searchTerm + '%' ))
		OR
		(Logger LIKE ('%' + @searchTerm + '%' ))
		OR
		(Level LIKE ('%' + @searchTerm + '%'))
		)
	AND (@startDate IS NULL OR CreatedDate >= @startDate)
	AND (@endDate IS NULL OR CreatedDate < (@endDate+1))
ORDER BY
	CASE 
		WHEN @sortBy = 'Id' AND @sortOrder = 'ASC'
		then Id END ASC,
	CASE
		WHEN @sortBy = 'Id' AND @sortOrder = 'DESC'
		then Id END DESC,
	CASE
		WHEN @sortBy = 'createdDate' AND @sortOrder = 'ASC'
		then CreatedDate END ASC,
	CASE
		WHEN @sortBy = 'createdDate' AND @sortOrder = 'DESC'
		then createdDate END DESC,
	CASE
		WHEN @sortBy = 'level' AND @sortOrder = 'ASC'
		then level END ASC,
	CASE
		WHEN @sortBy = 'level' AND @sortOrder = 'DESC'
		then level END DESC,
	CASE
		WHEN @sortBy = 'logger' AND @sortOrder = 'ASC'
		then logger END ASC,
	CASE
		WHEN @sortBy = 'logger' AND @sortOrder = 'DESC'
		then logger END DESC,
	CASE
		WHEN @sortBy = 'message' AND @sortOrder = 'ASC'
		then message END ASC,
	CASE	
		WHEN @sortBy = 'message' AND @sortOrder = 'DESC'
		then message END DESC
	OFFSET @pageSize * (@pageNumber - 1) ROWS 
	FETCH NEXT @pageSize ROWS ONLY;
END	
GO

